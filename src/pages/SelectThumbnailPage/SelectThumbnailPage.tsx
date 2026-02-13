import classes from './SelectThumbnailPage.module.css';
import { useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import Button from '@components/Buttons/Button/Button';
import { useTravel } from '@hooks/travel';
import { useApi } from '@hooks/api';
import { travelService } from 'src/apis/services/travel';
import { useEffect } from 'react';
export default function SelectThumbnailPage() {
  const token = localStorage.getItem('accessToken');
  const [travel, setTravel] = useTravel();
  const { error, data, loading, request } = useApi(travelService.createTravel);
  const handleClickButton = async () => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    request(travel, token);
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      alert(error);
      return;
    }
    if (data) {
      alert(`성공적으로 여행을 추가했습니다.${'\n'}여행페이지로 이동합니다.`);
      navigate(`/travel/${data}`);
    }
  }, [error, loading, data]);
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
      <Button className={classes.button} onClick={handleClickButton}>
        여행 추가
      </Button>
    </div>
  );
}
