import classes from './SelectThumbnailPage.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import ThumbnailPhotoGrid from './ThumbnailPhotoGrid';
import Button from '@components/Buttons/Button/Button';
import { useTravel } from 'src/domains/travel/hooks/travel';
import { useApi } from '@hooks/api';
import { travelService } from 'src/apis/services/travel';
import { useEffect } from 'react';
import useModal from '@hooks/useModal';
import StepProgress from 'src/domains/new/components/StepProgress/StepProgress';
import type { DatedPhotoData } from 'src/domains/travel/types/photo.type';

export default function SelectThumbnailPage() {
  const token = localStorage.getItem('accessToken');
  const { travel, setTravel } = useTravel();
  const { openModal, modalElement } = useModal();
  const { loading, data, error, request } = useApi(travelService.createTravel);
  const navigate = useNavigate();
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
    request(travel, token);
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
      travel.photos.forEach(({ url }) => URL.revokeObjectURL(url));
      openModal({
        title: '여행 생성 성공',
        message: `성공적으로 여행을 생성했습니다.${'\n'}여행페이지로 이동합니다.`,
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
  }, [error, loading, data]);
  const isValidTravelForThumbnail =
    travel.title.trim() !== '' && travel.photos.length > 0;
  if (!isValidTravelForThumbnail) {
    return <Navigate to="/my-travel" />;
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
        <h1 className={classes.headerText}>여행 추가</h1>
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
          {loading ? '여행 추가 중...' : '여행 추가'}
        </Button>
      </div>
      {modalElement}
    </div>
  );
}
