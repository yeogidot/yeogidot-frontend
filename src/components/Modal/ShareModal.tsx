import classes from './ShareModal.module.css';
import { snackbarManager } from '@components/Snackbar/manager';

type ShareModalProps = {
  shareUrl: string;
  onCancel: () => void;
};

export default function ShareModal({ shareUrl, onCancel }: ShareModalProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      snackbarManager.add({ description: '주소를 복사했습니다.' });
    } catch {
      snackbarManager.add({
        description: '복사에 실패했습니다. 다시 시도해 주세요.',
      });
    }
  };

  return (
    <div
      className={classes.modalOverlay}
      role="presentation"
      onClick={onCancel}
    >
      <div
        className={classes.shareModal}
        role="dialog"
        aria-labelledby="share-modal-title"
        onClick={event => event.stopPropagation()}
      >
        <h2 id="share-modal-title" className={classes.modalTitle}>
          여행 공유
        </h2>

        <div className={classes.urlBox}>
          <span className={classes.shareUrl}>{shareUrl}</span>
        </div>

        <p className={classes.modalDescription}>
          {'URL 주소 복사를 통해 여행을\n공유할 수 있습니다.'}
        </p>

        <div className={classes.modalButtonGroup}>
          <button
            type="button"
            className={classes.cancelButton}
            onClick={onCancel}
          >
            취소
          </button>
          <button
            type="button"
            className={classes.copyButton}
            onClick={handleCopy}
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
}
