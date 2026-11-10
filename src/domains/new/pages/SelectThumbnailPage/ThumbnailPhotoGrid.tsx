import type {
  DatedPhotoData,
  PhotoData,
} from 'src/domains/travel/types/photo.type';
import { dateCompare } from '@utils/date';
import classes from './ThumbnailPhotoGrid.module.css';
import ThumbnailPhotoTile from './ThumbnailPhotoTile';

interface Props {
  photos: DatedPhotoData[];
  /** 현재 대표 사진으로 선택된 사진의 id */
  thumbnailPhotoId: PhotoData['id'] | null | undefined;
  /** 사진을 대표 사진으로 선택 시 호출 */
  onThumbnailChange: (photo: DatedPhotoData) => void;
}

/**
 * 날짜 구분 없이 사진을 2열 그리드로 나열하는 대표 사진 선택 그리드.
 * (시안: 4. 대표 사진 선택 — 2단계)
 */
export default function ThumbnailPhotoGrid({
  photos,
  thumbnailPhotoId,
  onThumbnailChange,
}: Props) {
  const sortedPhotos: DatedPhotoData[] = [...photos].sort(dateCompare);
  return (
    <div className={classes.container}>
      {sortedPhotos.map(photo => (
        <ThumbnailPhotoTile
          key={photo.url}
          photo={photo}
          isThumbnail={thumbnailPhotoId === photo.id}
          onSelect={onThumbnailChange}
        />
      ))}
    </div>
  );
}
