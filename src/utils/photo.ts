import { encode } from '@jsquash/webp';
import {
  encodePhotosWithWebpWorkers,
  getRecommendedWebpWorkerCount,
} from './webpEncodePool';

export class WebpEncodingNotSupportedError extends Error {
  constructor() {
    super('이 기기는 WebP 이미지를 인코딩(변환)할 수 없습니다.');
    this.name = 'WebpEncodingNotSupportedError';
  }
}

export async function photoFileToWebp(photoFile: File) {
  return new Promise<File>((resolve, reject) => {
    const imageURL = URL.createObjectURL(photoFile);
    const image = new Image();
    image.onerror = () => {
      reject(
        new Error('이미지 변환에 사용될 이미지를 불러오기 실패하였습니다.')
      );
      URL.revokeObjectURL(imageURL);
    };
    image.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(
          new Error('이미지 변환에 필요한 Canvas Context를 찾을 수 없습니다.')
        );
        return;
      }
      context.drawImage(image, 0, 0);
      try {
        const photoImageData = context.getImageData(
          0,
          0,
          image.width,
          image.height
        );
        const webpArrayBuffer = await encode(photoImageData);
        const webpFile = new File(
          [webpArrayBuffer],
          photoFile.name.replace(/(\.[^/.]+)?$/, '.webp'),
          { type: 'image/webp' }
        );
        resolve(webpFile);
      } catch (error) {
        console.error('WebP 변환 중 오류 발생:', error);
        reject(new Error('이미지 변환 실패'));
      } finally {
        URL.revokeObjectURL(imageURL);
      }
    };
    image.src = imageURL;
  });
}

/**
 * 브라우저 네이티브 인코더(canvas.toBlob)를 사용한 WebP 변환.
 * jsquash WASM 기반 photoFileToWebp보다 빠르고 메인 스레드를 점유하지 않는다.
 *
 * WebP 인코딩을 지원하지 않는 환경(예: iOS 16.4 미만 WKWebView)에서는
 * 브라우저가 조용히 PNG로 인코딩하므로, blob.type을 검사해
 * WebpEncodingNotSupportedError를 던진다.
 */
export function photoFileToWebpNative(photoFile: File) {
  return new Promise<File>((resolve, reject) => {
    const imageURL = URL.createObjectURL(photoFile);
    const image = new Image();
    image.onerror = () => {
      reject(
        new Error('이미지 변환에 사용될 이미지를 불러오기 실패하였습니다.')
      );
      URL.revokeObjectURL(imageURL);
    };
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(
          new Error('이미지 변환에 필요한 Canvas Context를 찾을 수 없습니다.')
        );
        URL.revokeObjectURL(imageURL);
        return;
      }
      context.drawImage(image, 0, 0);
      canvas.toBlob(
        blob => {
          if (!blob || blob.type !== 'image/webp') {
            reject(new WebpEncodingNotSupportedError());
            return;
          }
          resolve(
            new File([blob], photoFile.name.replace(/(\.[^/.]+)?$/, '.webp'), {
              type: 'image/webp',
            })
          );
        },
        'image/webp',
        0.75
      );
      URL.revokeObjectURL(imageURL);
    };
    image.src = imageURL;
  });
}

let nativeWebpSupportProbe: Promise<boolean> | null = null;

/**
 * 네이티브 인코더의 WebP 지원 여부를 1회만 탐색하고 결과를 캐시한다.
 * 4x4 미니 캔버스로 toBlob('image/webp')을 시도해 blob.type을 확인하며,
 * Promise를 모듈에 캐시하므로 여러 장이 Promise.all로 동시 호출해도
 * 탐색은 페이지당 1회만 실행된다.
 *
 * 미지원 환경에서도 브라우저는 조용히 PNG 등으로 인코딩해 반환하므로
 * blob.type 검사로만 판별 가능하다.
 */
export function isNativeWebpEncodingSupported(): Promise<boolean> {
  if (!nativeWebpSupportProbe) {
    nativeWebpSupportProbe = new Promise(resolve => {
      const canvas = document.createElement('canvas');
      canvas.width = 4;
      canvas.height = 4;
      canvas.toBlob(
        blob => resolve(Boolean(blob && blob.type === 'image/webp')),
        'image/webp',
        0.75
      );
    });
  }
  return nativeWebpSupportProbe;
}

/**
 * 업로드 플로우용 변환 진입점 (2단 사다리).
 *
 * 1. 네이티브 canvas.toBlob — Chromium 계열(Android 등)에서 사용
 * 2. Worker + jsquash (WASM) × 코어수 기반 병렬 — Safari/iOS 등
 *    네이티브 WebP 인코딩 미지원 기기의 주력 경로
 *
 * 미지원 여부는 페이지당 1회 탐색(isNativeWebpEncodingSupported)으로
 * 확인하므로, 폴백 기기에서도 파일마다 낭비되는 네이티브 시도 없이
 * 곧바로 워커 경로로 진입한다.
 *
 * 두 단 모두 실패하면 명시적으로 에러를 던져 업로드가 실패하도록 한다.
 */
export async function photoFileToWebpSmart(photoFile: File) {
  const isNativeSupported = await isNativeWebpEncodingSupported();
  try {
    if (isNativeSupported) {
      return await photoFileToWebpNative(photoFile);
    }
  } catch (error) {
    // 지원한다고 탐색했음에도 개별 변환이 PNG 등으로 돌아온 경우
    // (정상 환경에서는 발생하지 않음) 워커 폴백으로 전환한다.
    if (!(error instanceof WebpEncodingNotSupportedError)) {
      throw error;
    }
  }
  // 네이티브 인코더를 WebP로 지원하지 않는 기기(iOS 계열 등)
  // -> 워커 jsquash 폴백 (코어 수 기준 권장 개수의 워커로 병렬 인코딩)
  const [workerResult] = await encodePhotosWithWebpWorkers(
    [photoFile],
    75,
    getRecommendedWebpWorkerCount()
  );
  if (!workerResult?.convertedFile) {
    throw new Error(
      `이미지 변환 실패 (${workerResult?.error ?? '알 수 없는 오류'})`
    );
  }
  return workerResult.convertedFile;
}

export const base64ToFile = (base64: string, fileName: string) => {
  const [header, data] = base64.split(',');
  const hasDataUrlHeader = base64.includes(',');
  const mimeType = hasDataUrlHeader
    ? (header.match(/data:(.*?);base64/)?.[1] ?? 'image/jpeg')
    : 'image/jpeg';
  const base64Data = hasDataUrlHeader ? data : base64;
  const binaryString = atob(base64Data);
  const byteArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
  const extension = mimeType.split('/')[1] ?? 'jpg';

  return new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
};
