import type { DatedPhotoData } from 'src/types/photo.type';
import Photo from '@components/Photo/Photo';
import classes from './PhotoGrid.module.css';
import { dateCompare } from '@utils/date';
interface Props {
  photos: DatedPhotoData[];
}

export default function PhotoGrid({ photos }: Props) {
  return (
    <div className={classes.container}>
      {photos.sort(dateCompare).map(photo => (
        <Photo key={photo.url} photo={photo} />
      ))}
    </div>
  );
}
