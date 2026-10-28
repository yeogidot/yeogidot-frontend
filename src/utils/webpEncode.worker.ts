import { encode } from '@jsquash/webp';
import type {
  WebpEncodeWorkerRequest,
  WebpEncodeWorkerResponse,
} from './webpEncodePool';

const workerContext = self as unknown as {
  onmessage: ((event: MessageEvent<WebpEncodeWorkerRequest>) => void) | null;
  postMessage: (
    message: WebpEncodeWorkerResponse,
    transfer?: ArrayBuffer[]
  ) => void;
};

async function encodeFileToWebp(photoFile: File, quality: number) {
  const bitmap = await createImageBitmap(photoFile, {
    imageOrientation: 'from-image',
  });
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('OffscreenCanvas 2D Context를 찾을 수 없습니다.');
    }
    context.drawImage(bitmap, 0, 0);
    const photoImageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    return await encode(photoImageData, { quality });
  } finally {
    bitmap.close();
  }
}

workerContext.onmessage = async event => {
  const { jobId, file, quality } = event.data;
  const start = performance.now();
  try {
    // 파일이 없으면 워밍업용 더미 인코딩 (WASM 모듈 초기화 목적)
    const webpArrayBuffer = file
      ? await encodeFileToWebp(file, quality)
      : await encode(new ImageData(4, 4), { quality });
    workerContext.postMessage(
      {
        jobId,
        ok: true,
        buffer: webpArrayBuffer,
        durationMs: performance.now() - start,
        size: webpArrayBuffer.byteLength,
      },
      [webpArrayBuffer]
    );
  } catch (error) {
    workerContext.postMessage({
      jobId,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      durationMs: performance.now() - start,
    });
  }
};
