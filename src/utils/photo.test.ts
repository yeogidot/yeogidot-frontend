import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as photo from './photo';
import * as pool from './webpEncodePool';
import { makeJpeg, isNativeWebpAvailable } from '../test/fixtures';

const nativeWebpAvailable = await isNativeWebpAvailable();

function mockNativeToBlob(type: string) {
  return vi
    .spyOn(HTMLCanvasElement.prototype, 'toBlob')
    .mockImplementation(callback => {
      callback(new Blob(['fake'], { type }));
    });
}

beforeEach(() => {
  photo.resetPhotoEncoderStateForTest();
});

afterEach(() => {
  vi.restoreAllMocks();
  pool.disposeWebpWorkers();
});

describe('isNativeWebpEncodingSupported', () => {
  it('브라우저가 webp를 돌려주면 지원으로 판정한다', async () => {
    mockNativeToBlob('image/webp');

    await expect(photo.isNativeWebpEncodingSupported()).resolves.toBe(true);
  });

  it('PNG로 돌려주면 미지원으로 판정한다', async () => {
    mockNativeToBlob('image/png');

    await expect(photo.isNativeWebpEncodingSupported()).resolves.toBe(false);
  });

  it('동시에 여러 번 호출해도 탐지는 한 번만 한다', async () => {
    const spy = mockNativeToBlob('image/webp');

    await Promise.all([
      photo.isNativeWebpEncodingSupported(),
      photo.isNativeWebpEncodingSupported(),
      photo.isNativeWebpEncodingSupported(),
    ]);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('photoFileToWebpNative', () => {
  it.runIf(nativeWebpAvailable)(
    '실제 브라우저에서 webp 파일을 만든다',
    async () => {
      const file = await makeJpeg('native.jpg');

      const result = await photo.photoFileToWebpNative(file);

      expect(result.type).toBe('image/webp');
      expect(result.name).toBe('native.webp');
    }
  );

  it('PNG로 돌려주면 WebpEncodingNotSupportedError로 실패한다', async () => {
    const file = await makeJpeg();
    mockNativeToBlob('image/png');

    await expect(photo.photoFileToWebpNative(file)).rejects.toBeInstanceOf(
      photo.WebpEncodingNotSupportedError
    );
  });
});

describe('photoFileToWebpSmart', () => {
  it.runIf(nativeWebpAvailable)(
    '네이티브를 지원하는 브라우저에서는 webp를 반환한다',
    async () => {
      const file = await makeJpeg('smart.jpg');

      const result = await photo.photoFileToWebpSmart(file);

      expect(result.type).toBe('image/webp');
    }
  );

  it('네이티브 미지원 기기에서는 워커 폴백으로 webp를 만든다', async () => {
    const file = await makeJpeg('fallback.jpg');
    mockNativeToBlob('image/png');

    const result = await photo.photoFileToWebpSmart(file);

    expect(result.type).toBe('image/webp');
    expect(result.name).toBe('fallback.webp');
  });
});

describe('preparePhotoEncoder', () => {
  it('네이티브 지원 기기에서는 워커를 만들지 않는다', async () => {
    mockNativeToBlob('image/webp');
    const workerSpy = vi.spyOn(globalThis, 'Worker');

    await photo.preparePhotoEncoder();

    expect(workerSpy).not.toHaveBeenCalled();
  });

  it('미지원 기기에서는 추천 개수만큼 워커를 미리 만들고, 여러 번 불러도 한 번만 준비한다', async () => {
    mockNativeToBlob('image/png');
    const workerSpy = vi.spyOn(globalThis, 'Worker');

    await Promise.all([
      photo.preparePhotoEncoder(),
      photo.preparePhotoEncoder(),
    ]);

    expect(workerSpy).toHaveBeenCalledTimes(
      pool.getRecommendedWebpWorkerCount()
    );
  });
});
