import classes from './SelectThumbnailPage.module.css';
import { useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import Button from '@components/Buttons/Button/Button';
import { useTravel } from '@hooks/travel';
import { dateCompare } from '@utils/date';
export default function SelectThumbnailPage() {
  const { travel, setTravel } = useTravel();

  const thumbnail = travel.photos.find(
    ({ id }) => id === travel.thumbnailPhotoId
  );
  const setThumbnailPhotoId = (id: number) => {
    setTravel(travel => {
      return { ...travel, thumbnailPhotoId: id };
    });
  };
  if (thumbnail === undefined) {
    const earliestPhoto = [...travel.photos]
      .sort(dateCompare)
      .find(({ date }) => date);
    setThumbnailPhotoId(earliestPhoto ? earliestPhoto.id : travel.photos[0].id);
  }
  const thumbnailCheckedPhotos = travel.photos.map(photo => {
    return {
      ...photo,
      warning: false,
      isThumbnail: travel.thumbnailPhotoId === photo.id,
    };
  });
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <button
          className={classes.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={BlackBackIcon} alt="뒤로가기 버튼 이미지" />
        </button>
        <h1 className={classes.headerText}>대표 사진 선택</h1>
        <p className={classes.uploadDescription}>
          내 여행목록 리스트에 보여지는 사진입니다.
        </p>
      </header>
      <h3 className={classes.photoHeader}>여행 사진</h3>
      <DatePhotoGrid
        className={classes.photoGrid}
        photos={thumbnailCheckedPhotos}
      />
      <Button className={classes.button}>여행 추가</Button>
    </div>
  );
}
