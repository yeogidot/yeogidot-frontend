import CalendarIcon from '@assets/icons/calendar-month.svg?react';
import LocationIcon from '@assets/icons/location-on.svg?react';
import { formatDateDot } from '@utils/date';
import classes from './SelectedPhotoCard.module.css';

interface SelectedPhotoCardProps {
  thumbnailUrl: string;
  takenAt: string | null;
  region: string | null;
  onViewPhoto: () => void;
}

export default function SelectedPhotoCard({
  thumbnailUrl,
  takenAt,
  region,
  onViewPhoto,
}: SelectedPhotoCardProps) {
  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <img src={thumbnailUrl} className={classes.thumbnail} alt="" />
        <div className={classes.texts}>
          <div className={classes.row}>
            <CalendarIcon className={classes.icon} aria-hidden="true" />
            <span className={classes.dateText}>
              {takenAt ? formatDateDot(takenAt) : '-'}
            </span>
          </div>
          <div className={classes.row}>
            <LocationIcon className={classes.icon} aria-hidden="true" />
            <span className={classes.regionText}>{region || '-'}</span>
          </div>
        </div>
      </div>
      <button type="button" className={classes.button} onClick={onViewPhoto}>
        사진 보기
      </button>
    </div>
  );
}
