import type { DatedPhotoData } from 'src/types/photo.type';
import classes from './DatePhotoGrid.module.css';
import PhotoGrid from '@components/PhotoGrid/PhotoGrid';
interface Props {
  photos: DatedPhotoData[];
  className?: string | undefined;
}

const createPhotoDateMap = (photos: DatedPhotoData[]) => {
  return photos.reduce((photoDateMap, currentPhoto) => {
    const date = currentPhoto.date ? currentPhoto.date.split('T')[0] : null;
    const photos = photoDateMap.get(date);
    if (photos) {
      return photoDateMap.set(date, [...photos, currentPhoto]);
    }
    return photoDateMap.set(date, [currentPhoto]);
  }, new Map<string | null, DatedPhotoData[]>());
};

export default function DatePhotoGrid({ photos, className = '' }: Props) {
  const photoDateMap = createPhotoDateMap(photos);
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
