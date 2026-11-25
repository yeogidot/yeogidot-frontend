import { useEffect } from 'react';
import { Toast } from '@base-ui/react/toast';
import { snackbarManager } from './manager';
import classes from './Snackbar.module.css';

export default function Snackbar() {
  // 언마운트 시 대기 중인 스낵바를 모두 정리 (스토리북 스토리 전환 시 잔상 방지)
  useEffect(() => () => snackbarManager.close(), []);

  return (
    <Toast.Provider toastManager={snackbarManager}>
      <Toast.Portal>
        <Toast.Viewport className={classes.viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map(toast => (
    <Toast.Root key={toast.id} toast={toast} className={classes.toast}>
      <Toast.Content className={classes.content}>
        <Toast.Description className={classes.message} />
        {toast.actionProps && <Toast.Action className={classes.action} />}
      </Toast.Content>
    </Toast.Root>
  ));
}
