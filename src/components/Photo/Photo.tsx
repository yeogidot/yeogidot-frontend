import type { PhotoData } from 'src/types/photo.type';
import classes from './Photo.module.css';
import WarningIcon from '@assets/icons/warning.svg';
import { Link } from 'react-router-dom';
interface Props {
  photo: PhotoData;
  link?: string;
}
export default function Photo({ photo, link }: Props) {
  return (
    <Link className={classes.photoLink} to={link ?? ''}>
      {photo.warning && (
        <img
          src={WarningIcon}
          className={classes.warningIcon}
          alt="사진 경고"
        />
      )}
      <img
        className={`${classes.photo} ${photo.warning ? classes.warning : ''}`}
        src={photo.url}
        alt={photo.name}
        loading="lazy"
      />
    </Link>
  );
}
