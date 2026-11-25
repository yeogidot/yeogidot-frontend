import type { DatedPhotoData } from '../../types/photo.type';
import Photo from '../Photo/Photo';
import classes from './PhotoGrid.module.css';
import { dateCompare } from '@utils/date';
import type { ReactNode } from 'react';

interface Props {
  photos: DatedPhotoData[];
  /** 그리드 첫 번째 칸에 표시할 업로드 타일 (예: AddPhotoTile) */
  uploadTile?: ReactNode | undefined;
  /** 전달하면 각 사진에 삭제 버튼이 표시되고 클릭 시 해당 사진이 전달된다. */
  onPhotoDelete?: ((photo: DatedPhotoData) => void) | undefined;
}

export default function PhotoGrid({
  photos,
  uploadTile,
  onPhotoDelete,
}: Props) {
  return (
    <div className={classes.container}>
      {uploadTile ?? null}
      {photos.sort(dateCompare).map(photo => (
        <Photo
          key={photo.url}
          photo={photo}
          onDelete={onPhotoDelete ? () => onPhotoDelete(photo) : undefined}
        />
      ))}
    </div>
  );
}
