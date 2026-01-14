import classes from './DatetimeModal.module.css';
interface Props {
  currentDate: string | null;
  onDatetimeChange?: () => void;
  onCancel?: () => void;
}

export default function DatetimeModal({
  currentDate,
  onDatetimeChange,
  onCancel,
}: Props) {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  return (
    <div
      className={classes.modalOverlay}
      role="presentation"
      onClick={onCancel}
    >
      <div
        className={classes.modal}
        role="dialog"
        aria-labelledby="modal-title"
        onClick={event => event.stopPropagation()}
      >
        <h2 id="modal-title" className={classes.modalTitle}>
          촬영 날짜 및 시간 수정
        </h2>

        <div className={classes.datetimeBox}>
          <label htmlFor="datetime-picker"></label>
          <input
            className={classes.datetimePicker}
            id="datetime-picker"
            type="datetime-local"
            value={
              currentDate
                ? currentDate.slice(0, 16)
                : new Date(Date.now() - timezoneOffset)
                    .toISOString()
                    .slice(0, 16)
            }
            onChange={onDatetimeChange}
          />
        </div>

        <div className={classes.modalButtonGroup}>
          <button
            type="button"
            className={classes.cancelButton}
            onClick={onCancel}
          >
            취소
          </button>
          <button type="button" className={classes.confirmButton}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
