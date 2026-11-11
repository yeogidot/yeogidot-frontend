import type { PhotoData } from '../../types/photo.type';
import classes from './Photo.module.css';
import WarningIcon from '@assets/icons/warning.svg';
import CheckIcon from '@assets/icons/thumbnail-check.svg';
import CloseWhiteIcon from '@assets/icons/x-white.svg';
import { Link } from 'react-router-dom';

interface Props {
  photo: PhotoData;
  /**
   * 전달하면 썸네일 우상단에 사진 삭제 버튼이 표시된다.
   * (예: 여행 추가 화면에서 선택한 사진을 제거할 때 사용)
   */
  onDelete?: (() => void) | undefined;
}

export default function Photo({ photo, onDelete }: Props) {
  return (
    <div className={classes.photoItem}>
      <Link
        className={classes.photoLink}
        to={photo.link ?? ''}
        state={{ photo, forward: true }}
        viewTransition
      >
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
      {onDelete && (
        <button
          type="button"
          className={classes.photoDeleteButton}
          aria-label="사진 삭제"
          onClick={onDelete}
        >
          <img src={CloseWhiteIcon} alt="" className={classes.closeIcon} />
        </button>
      )}
    </div>
  );
}
