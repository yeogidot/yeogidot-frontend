import type { PhotoData } from 'src/types/photo.type';
import classes from './Photo.module.css';
import WarningIcon from '@assets/icons/warning.svg';
import CheckIcon from '@assets/icons/thumbnail-check.svg';
import { Link } from 'react-router-dom';
interface Props {
  photo: PhotoData;
}
export default function Photo({ photo }: Props) {
  return (
    <Link className={classes.photoLink} to={photo.link ?? ''} state={photo}>
      {photo.warning && (
        <img
          src={WarningIcon}
          className={classes.warningIcon}
          alt="사진 경고"
        />
      )}
      {photo.isThumbnail && (
        <img
          src={CheckIcon}
          className={classes.thumbnailIcon}
          alt="대표 이미지"
        />
      )}
      <img
        className={`${classes.photo} ${photo.warning ? classes.warning : ''} ${photo.isThumbnail ? classes.thumbnail : ''}`}
        src={photo.url}
        alt={photo.file.name}
        loading="lazy"
      />
    </Link>
  );
}
