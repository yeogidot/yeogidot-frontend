import type { DatedPhotoData } from 'src/types/photo.type';
import classes from './DatePhotoGrid.module.css';
import PhotoGrid from '@components/PhotoGrid/PhotoGrid';
interface Props {
  photoDateMap: Map<string | null, DatedPhotoData[]>;
  className?: string | undefined;
}

export default function DatePhotoGrid({ photoDateMap, className = '' }: Props) {
  const dateKeys = Array.from(photoDateMap.keys()).filter(date => date);
  const dateNullPhotos = photoDateMap.get(null);
  return (
    <div className={`${classes.container} ${className}`}>
      {dateKeys.sort().map(date => {
        return (
          <div key={date}>
            <h3 className={classes.date}>{date}</h3>
            <PhotoGrid photos={photoDateMap.get(date) ?? []} />
          </div>
        );
      })}
      {dateNullPhotos ? (
        <div key="date-null">
          <h3 className={classes.date}>날짜 정보 없음</h3>
          <PhotoGrid photos={dateNullPhotos} />
        </div>
      ) : null}
    </div>
  );
}
