/**
 * WebP 인코딩 워커 풀 (프로덕션 모듈).
 *
 * 여러 이미지의 WebP 인코딩을 Web Worker에 산포해 병렬 처리한다.
 * - 업로드 폴백 경로(photoFileToWebpSmart)와 벤치마크 페이지
 *   (photoBenchmark.ts) 양쪽에서 재사용된다.
 * - 각 워커는 자체 WASM(jsquash) 인스턴스를 유지하며, 풀은
 *   배치 실행 간 재사용된다.
 * - 벤치마크 계측 논리는 이 파일에 두지 않는다.
 */

/**
 * 워커에 전달할 인코딩 요청.
 * 결과 ArrayBuffer나 실패 메시지를 메인 스레드에 반환한다.
 * ok가 true이면 buffer는 전송(transfer)되어 워커 쪽 메모리에서 해제된다.
 */
export type WebpEncodeWorkerRequest = {
  jobId: number;
  /** null이면 워밍업용 더미 인코딩 수행 */
  file: File | null;
  quality: number;
};

export type WebpEncodeWorkerResponse =
  | {
      jobId: number;
      ok: true;
      buffer: ArrayBuffer;
      durationMs: number;
      size: number;
    }
  | {
      jobId: number;
      ok: false;
      error: string;
      durationMs: number;
    };

/** 워커(또는 폴백 경로)로 변환된 파일 1건의 결과 */
export interface WebpEncodeWorkerResult {
  fileName: string;
  originalSize: number;
  convertedSize: number;
  durationMs: number;
  convertedFile: File | null;
  error?: string;
}

export function toWebpFileName(fileName: string) {
  return fileName.replace(/(\.[^/.]+)?$/, '.webp');
}

interface WebpWorkerEntry {
  worker: Worker;
  busy: boolean;
}

let webpWorkerEntries: WebpWorkerEntry[] = [];
let nextWebpJobId = 1;
const pendingWebpJobs = new Map<
  number,
  (response: WebpEncodeWorkerResponse) => void
>();
const webpTaskQueue: ((worker: Worker) => void)[] = [];

function createWebpWorker() {
  const worker = new Worker(
    new URL('./webpEncode.worker.ts', import.meta.url),
    { type: 'module' }
  );
  worker.onmessage = (event: MessageEvent<WebpEncodeWorkerResponse>) => {
    const response = event.data;
    const pending = pendingWebpJobs.get(response.jobId);
    pendingWebpJobs.delete(response.jobId);
    pending?.(response);
    const entry = webpWorkerEntries.find(
      candidate => candidate.worker === worker
    );
    if (entry) {
      entry.busy = false;
    }
    const nextTask = webpTaskQueue.shift();
    if (nextTask) {
      dispatchWebpEncodeTask(nextTask);
    }
  };
  return worker;
}

function ensureWebpWorkers(workerCount: number) {
  if (webpWorkerEntries.length > workerCount) {
    webpWorkerEntries.slice(workerCount).forEach(entry => {
      entry.worker.terminate();
    });
    webpWorkerEntries = webpWorkerEntries.slice(0, workerCount);
  }
  while (webpWorkerEntries.length < workerCount) {
    webpWorkerEntries.push({ worker: createWebpWorker(), busy: false });
  }
}

function dispatchWebpEncodeTask(task: (worker: Worker) => void) {
  const freeEntry = webpWorkerEntries.find(entry => !entry.busy);
  if (freeEntry) {
    freeEntry.busy = true;
    task(freeEntry.worker);
    return;
  }
  webpTaskQueue.push(task);
}

function runWebpEncodeJob(
  photoFile: File | null,
  quality: number
): Promise<WebpEncodeWorkerResponse> {
  return new Promise(resolve => {
    const jobId = nextWebpJobId++;
    pendingWebpJobs.set(jobId, resolve);
    dispatchWebpEncodeTask(worker => {
      worker.postMessage({ jobId, file: photoFile, quality });
    });
  });
}

/** 페이지 첫 로딩 시 추천되는 워커 수 (코어 수 기준, 최대 4) */
export function getRecommendedWebpWorkerCount() {
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
  return Math.max(1, Math.min(4, hardwareConcurrency - 1));
}

/** 워밍업: 각 워커의 WASM 모듈 초기화를 미리 완료시킨다. */
export async function warmupWebpWorkers(workerCount: number) {
  ensureWebpWorkers(workerCount);
  await Promise.all(
    Array.from({ length: workerCount }, () => runWebpEncodeJob(null, 75))
  );
}

/** 풀의 모든 워커를 종료한다 (측정 완료 후 호출 권장). */
export function disposeWebpWorkers() {
  webpWorkerEntries.forEach(entry => {
    entry.worker.terminate();
  });
  webpWorkerEntries = [];
  pendingWebpJobs.clear();
  webpTaskQueue.length = 0;
}

/**
 * 여러 이미지를 워커 N개에 산포해 병렬로 WebP 변환한다.
 * 벤치마크 계측 없이 순수하게 변환 결과만 반환한다.
 */
export async function encodePhotosWithWebpWorkers(
  files: File[],
  quality: number,
  workerCount: number
): Promise<WebpEncodeWorkerResult[]> {
  ensureWebpWorkers(Math.max(1, workerCount));

  return Promise.all(
    files.map(async photoFile => {
      const response = await runWebpEncodeJob(photoFile, quality);
      if (response.ok) {
        return {
          fileName: photoFile.name,
          originalSize: photoFile.size,
          convertedSize: response.size,
          durationMs: response.durationMs,
          convertedFile: new File(
            [response.buffer],
            toWebpFileName(photoFile.name),
            { type: 'image/webp' }
          ),
        } satisfies WebpEncodeWorkerResult;
      }
      return {
        fileName: photoFile.name,
        originalSize: photoFile.size,
        convertedSize: 0,
        durationMs: response.durationMs,
        convertedFile: null,
        error: response.error,
      } satisfies WebpEncodeWorkerResult;
    })
  );
}
