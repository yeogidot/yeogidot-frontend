import type { DatedPhotoData } from 'src/types/photo.type';
import Photo from '@components/Photo/Photo';
import classes from './PhotoGrid.module.css';
interface Props {
  photos: DatedPhotoData[];
}

export default function PhotoGrid({ photos }: Props) {
  return (
    <div className={classes.container}>
      {photos
        .sort(
          (a, b) =>
            new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
        )
        .map(photo => (
          <Photo key={photo.url} photo={photo} />
        ))}
    </div>
  );
}
