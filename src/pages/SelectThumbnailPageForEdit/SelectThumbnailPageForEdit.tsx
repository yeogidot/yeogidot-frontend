import classes from './SelectThumbnailPageForEdit.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import Button from '@components/Buttons/Button/Button';
import { useEditTravel } from '@hooks/travel';
import { useApi } from '@hooks/api';
import { travelService } from 'src/apis/services/travel';
import { useEffect } from 'react';
export default function SelectThumbnailPageForEdit() {
  const token = localStorage.getItem('accessToken');
  const { state } = useLocation();
  const { travel } = useEditTravel();
  const navigate = useNavigate();
  const { error, data, loading, request } = useApi(
    travelService.updateTravelInfo
  );
  const handleClickButton = () => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    request(state.travelId, travel, token);
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
      alert(`성공적으로 여행을 수정했습니다.${'\n'}여행페이지로 이동합니다.`);
      navigate(`/travel/${state.travelId}`);
    }
  }, [loading, error, data, navigate, state.travelId]);
  const thumbnailCheckedPhotos = travel.photos.map(photo => {
    return {
      ...photo,
      warning: false,
      isThumbnail: travel.thumbnailPhotoId === photo.id,
    };
  });
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
      <Button
        className={classes.button}
        onClick={handleClickButton}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? '여행 수정 중...' : '여행 수정'}
      </Button>
      <p className={classes.loadingMessage} role="status" aria-live="polite">
        {loading
          ? '여행을 수정하고 있어요. 완료되면 자동으로 여행 페이지로 이동해요.'
          : ''}
      </p>
    </div>
  );
}