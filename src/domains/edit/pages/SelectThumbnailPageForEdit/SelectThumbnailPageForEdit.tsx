import classes from './SelectThumbnailPageForEdit.module.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import ThumbnailPhotoGrid from 'src/domains/new/pages/SelectThumbnailPage/ThumbnailPhotoGrid';
import Button from '@components/Buttons/Button/Button';
import { useEditTravel } from 'src/domains/travel/hooks/travel';
import { useApi } from '@hooks/api';
import useModal from '@hooks/useModal';
import { travelService } from 'src/apis/services/travel';
import { useEffect } from 'react';
import StepProgress from 'src/domains/new/components/StepProgress/StepProgress';
import type { DatedPhotoData } from 'src/domains/travel/types/photo.type';
export default function SelectThumbnailPageForEdit() {
  const token = localStorage.getItem('accessToken');
  const { state } = useLocation();
  const { travel, setTravel } = useEditTravel();
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
        onCancel: () => navigate('/error/401'),
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
  const handleThumbnailChange = (photo: DatedPhotoData) => {
    setTravel(currentTravel => {
      return { ...currentTravel, thumbnailPhotoId: photo.id };
    });
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
      travel.photos.forEach(({ url }) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });

      openModal({
        title: '여행 수정 성공',
        message: `성공적으로 여행을 수정했습니다.${'\n'}여행페이지로 이동합니다.`,
        onCancel: () =>
          navigate(`/travel/${state.travel.travelId}`, {
            viewTransition: true,
            state: { forward: true },
          }),
        onConfirm: () =>
          navigate(`/travel/${state.travel.travelId}`, {
            viewTransition: true,
            state: { forward: true },
          }),
      });
    }
  }, [loading, error, data, navigate, openModal, state.travelId]);
  if (!travel) {
    return <Navigate to={'/my-travel'} />;
  }
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
        <h1 className={classes.headerText}>여행 수정</h1>
      </header>
      <StepProgress
        current={2}
        total={2}
        description="여행 목록에 표시할 대표 사진을 선택해 주세요."
      />
      <ThumbnailPhotoGrid
        photos={travel.photos}
        thumbnailPhotoId={travel.thumbnailPhotoId}
        onThumbnailChange={handleThumbnailChange}
      />
      <div className={classes.nextButtonContainer}>
        <Button
          className={classes.nextButton}
          onClick={handleClickButton}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? '여행 수정 중...' : '여행 수정'}
        </Button>
      </div>
      {modalElement}
    </div>
  );
}
