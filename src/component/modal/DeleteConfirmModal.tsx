import classes from './DeleteConfirmModal.module.css';

type DeleteConfirmModalProps = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  message,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <div className={classes.modalOverlay} role="presentation" onClick={onCancel}>
      <div
        className={classes.deleteModal}
        role="dialog"
        aria-labelledby="delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p id="delete-modal-title" className={classes.modalMessage}>
          {message}
        </p>

        <div className={classes.modalButtonGroup}>
          <button type="button" className={classes.cancelButton} onClick={onCancel}>
            취소
          </button>
          <button type="button" className={classes.confirmDeleteButton} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

