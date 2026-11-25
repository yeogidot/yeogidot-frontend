import { Toast } from '@base-ui/react/toast';

/**
 * React 트리 어디서든(컴포넌트 밖의 일반 함수 포함) 호출할 수 있는 전역 스낵바 매니저.
 *
 * snackbarManager.add({ description: '저장되었습니다.' });
 * snackbarManager.add({
 *   description: '일정이 삭제되었습니다.',
 *   actionProps: { children: '취소', onClick: () => {} },
 * });
 */
export const snackbarManager = Toast.createToastManager();
