import classes from './SelectThumbnailPageForEdit.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import Button from '@components/Buttons/Button/Button';
import { useEditTravel } from '@hooks/travel';
import { useApi } from '@hooks/api';
import useModal from '@hooks/useModal';
import { travelService } from 'src/apis/services/travel';
import { useEffect } from 'react';
export default function SelectThumbnailPageForEdit() {
  const token = localStorage.getItem('accessToken');
  const { state } = useLocation();
  const { travel } = useEditTravel();
  const { openModal, modalElement } = useModal();
  const navigate = useNavigate();
  const { error, data, loading, request } = useApi(
    travelService.updateTravelInfo
  );
  const handleClickButton = () => {
    if (!token) {
      openModal({
        title: '권한없음',
        message: '로그인이 필요한 서비스입니다.',
        onCancel: () => navigate('/error/401', { viewTransition: true }),
        onConfirm: () =>
          navigate('/login', {
            viewTransition: true,
            state: { forward: true },
          }),
      });
      return;
    }
    request(state.travel.travelId, travel, token);
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      openModal({
        title: '에러',
        message: error,
      });
      return;
    }
    if (data) {
      openModal({
        title: '여행 수정 성공',
        message: `성공적으로 여행을 수정했습니다.${'\n'}여행페이지로 이동합니다.`,
        onCancel: () =>
          navigate(`/travel/${data}`, {
            viewTransition: true,
            state: { forward: true },
          }),
        onConfirm: () =>
          navigate(`/travel/${data}`, {
            viewTransition: true,
            state: { forward: true },
          }),
      });
    }
  }, [loading, error, data, navigate, openModal, state.travelId]);
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
      {modalElement}
    </div>
  );
}
