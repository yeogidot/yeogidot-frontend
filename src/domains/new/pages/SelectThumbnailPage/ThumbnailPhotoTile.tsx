import type { DatedPhotoData } from 'src/domains/travel/types/photo.type';
import CheckWhiteIcon from '@assets/icons/check-white.svg';
import classes from './ThumbnailPhotoTile.module.css';

interface Props {
  photo: DatedPhotoData;
  /** 이 사진이 현재 대표 사진으로 선택되어 있는지 여부 */
  isThumbnail: boolean;
  /** 타일 클릭 시 이 사진을 대표 사진으로 선택하도록 요청 */
  onSelect: (photo: DatedPhotoData) => void;
}

/**
 * 대표 사진 선택 화면의 개별 사진 타일.
 * 클릭하면 즉시 대표 사진으로 선택된다 (시안: 4. 대표 사진 선택 — 2단계).
 */
export default function ThumbnailPhotoTile({
  photo,
  isThumbnail,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      className={`${classes.tile} ${isThumbnail ? classes.selected : ''}`}
      aria-pressed={isThumbnail}
      onClick={() => onSelect(photo)}
    >
      <img
        className={classes.photo}
        src={photo.url}
        alt={photo.file.name}
        loading="lazy"
      />
      {isThumbnail && (
        <>
          <span className={classes.selectedOverlay} />
          <span className={classes.checkBadge}>
            <img src={CheckWhiteIcon} alt="" />
          </span>
          <span className={classes.thumbnailLabel}>대표 사진</span>
        </>
      )}
    </button>
  );
}
