import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  disposeWebpWorkers,
  encodePhotosWithWebpWorkers,
  getRecommendedWebpWorkerCount,
  toWebpFileName,
} from './webpEncodePool';
import { makeJpeg } from '../test/fixtures';

describe('toWebpFileName', () => {
  it.each([
    ['photo.jpg', 'photo.webp'],
    ['photo.final.png', 'photo.final.webp'],
    ['noext', 'noext.webp'],
  ])('%s -> %s', (input, expected) => {
    expect(toWebpFileName(input)).toBe(expected);
  });
});

describe('getRecommendedWebpWorkerCount', () => {
  const setCores = (cores: number) =>
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: cores,
      configurable: true,
    });

  afterEach(() => {
    delete (navigator as unknown as { hardwareConcurrency?: number })
      .hardwareConcurrency;
  });

  it.each([
    [1, 1],
    [2, 1],
    [4, 3],
    [8, 4],
    [16, 4],
  ])('코어 %i개이면 워커 %i개를 추천한다', (cores, expected) => {
    setCores(cores);
    expect(getRecommendedWebpWorkerCount()).toBe(expected);
  });
});

describe('encodePhotosWithWebpWorkers', () => {
  afterEach(() => {
    disposeWebpWorkers();
  });

  it('워커에서 webp 파일을 만든다', async () => {
    const [result] = await encodePhotosWithWebpWorkers(
      [await makeJpeg('a.jpg')],
      75,
      1
    );

    expect(result.error).toBeUndefined();
    expect(result.convertedFile?.type).toBe('image/webp');
    expect(result.convertedFile?.name).toBe('a.webp');
    expect(result.convertedSize).toBeGreaterThan(0);
  });

  it('여러 장을 여러 워커로 처리해도 입력 순서대로 결과를 돌려준다', async () => {
    const files = [
      await makeJpeg('1.jpg'),
      await makeJpeg('2.jpg'),
      await makeJpeg('3.jpg'),
    ];

    const results = await encodePhotosWithWebpWorkers(files, 75, 2);

    expect(results.map(result => result.fileName)).toEqual([
      '1.jpg',
      '2.jpg',
      '3.jpg',
    ]);
    expect(
      results.every(result => result.convertedFile?.type === 'image/webp')
    ).toBe(true);
  });

  it('디코딩할 수 없는 파일은 error로 보고한다', async () => {
    const broken = new File(['not an image'], 'broken.jpg', {
      type: 'image/jpeg',
    });

    const [result] = await encodePhotosWithWebpWorkers([broken], 75, 1);

    expect(result.convertedFile).toBeNull();
    expect(result.error).toEqual(expect.any(String));
  });

  it('워커가 로드에 실패하면 대기 중인 작업을 모두 error로 끝낸다', async () => {
    const RealWorker = globalThis.Worker;
    class BrokenWorker extends EventTarget {
      onerror: ((event: ErrorEvent) => void) | null = null;
      onmessage: ((event: MessageEvent) => void) | null = null;
      postMessage() {
        queueMicrotask(() => {
          this.onerror?.(new ErrorEvent('error', { message: 'load failed' }));
        });
      }
      terminate() {}
    }
    vi.stubGlobal('Worker', BrokenWorker);

    try {
      const results = await encodePhotosWithWebpWorkers(
        [await makeJpeg('x1.jpg'), await makeJpeg('x2.jpg')],
        75,
        1
      );

      expect(results).toHaveLength(2);
      results.forEach(result => {
        expect(result.convertedFile).toBeNull();
        expect(result.error).toBe('load failed');
      });
    } finally {
      vi.stubGlobal('Worker', RealWorker);
    }
  });

  it('결과 webp는 다시 디코딩할 수 있다', async () => {
    const [result] = await encodePhotosWithWebpWorkers(
      [await makeJpeg('decode.jpg', 64)],
      75,
      1
    );
    expect(result.convertedFile).not.toBeNull();

    const bitmap = await createImageBitmap(result.convertedFile!);
    expect(bitmap.width).toBe(64);
    expect(bitmap.height).toBe(64);
    bitmap.close();
  });
});
