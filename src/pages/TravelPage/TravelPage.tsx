import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './TravelPage.module.css';
import EditButton from '../../components/Buttons/EditButton/EditButton.tsx';
import ShareButton from '../../components/Buttons/ShareButton/ShareButton.tsx';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton.tsx';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton.tsx';
import BackgroundMap from '../../components/Map/Map.tsx';
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import ShareModal from '../../components/Modal/ShareModal.tsx';
import PhotoMarker from '../../components/Map/PhotoMarker.tsx';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';
import ErrorPage from '../ErrorPage/ErrorPage.tsx';

// import type { FullTravel } from 'src/types/travel.type'; // inferred from service

const MAP_CENTER_LATITUDE_OFFSET = 0.007;

export default function TravelPage() {
  const navigate = useNavigate();
  const { travelId } = useParams<{ travelId: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // API Hooks
  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    status: travelStatus,
    request: fetchTravel,
  } = useApi(travelService.getTravel);

  const { request: deleteTravel } = useApi(travelService.deleteTravel);

  const { data: sharedUrlData, request: fetchSharedUrl } = useApi(
    travelService.getSharedUrl
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      fetchTravel(Number(travelId), token);
    }
  }, [travelId]);

  if (travelLoading) return <div>Loading...</div>;
  if (travelError)
    return <ErrorPage status={travelStatus} message={travelError} />;
  if (!travel) return <div>여행 데이터를 찾을 수 없습니다.</div>;

  const allPhotos = travel.days.flatMap(day =>
    (day.photos || []).filter(
      p =>
        p.url &&
        p.latitude !== null &&
        p.longitude !== null &&
        p.latitude !== undefined &&
        p.longitude !== undefined
    )
  );

  const mapCenter =
    allPhotos.length > 0 &&
    allPhotos[0].latitude !== null &&
    allPhotos[0].longitude !== null &&
    allPhotos[0].latitude !== undefined &&
    allPhotos[0].longitude !== undefined
      ? { lat: allPhotos[0].latitude, lng: allPhotos[0].longitude }
      : undefined;

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      await deleteTravel(Number(travelId), token);
      navigate('/my-travel', {
        viewTransition: true,
        state: { forward: true },
      }); // Go back to list after delete
    }
    setShowDeleteModal(false);
  };

  const handleShareClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      await fetchSharedUrl(Number(travelId), token);
      setShowShareModal(true);
    }
  };

  const handleCloseShareModal = () => setShowShareModal(false);

  const handleDayClick = (dayNumber: number) => {
    navigate(`./${dayNumber}`, {
      viewTransition: true,
      state: { forward: true },
    });
  };

  const handlePhotoClick = (photoId: string | number) => {
    navigate(`/travel/${travelId}/photos/${photoId}/travel-photo-comment`, {
      viewTransition: true,
      state: {
        forward: true,
      },
    });
  };

  const handleBackClick = () => navigate(-1);

  return (
    <div className={classes.container}>
      <BackgroundMap
        position={
          mapCenter
            ? [
                (mapCenter.lat as number) - MAP_CENTER_LATITUDE_OFFSET,
                mapCenter.lng as number,
              ]
            : undefined
        }
      >
        {allPhotos.map((photo, index) => {
          const currentPhotoId = photo.photoId ?? (photo as any).id;
          return (
            <PhotoMarker
              key={`${currentPhotoId}-${index}`}
              position={[photo.latitude!, photo.longitude!]}
              photoUrl={photo.url!}
              onClick={() => currentPhotoId && handlePhotoClick(currentPhotoId)}
            />
          );
        })}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>
      <div className={classes.panel}>
        <div className={classes.headerRow}>
          <div className={classes.header}>
            {travel.title.length > 10
              ? travel.title.slice(0, 10) + '...'
              : travel.title}
          </div>

          <div className={classes.buttonGroup}>
            <EditButton
              onClick={() =>
                navigate('/edit-travel', {
                  viewTransition: true,
                  state: {
                    travel: { travelId: Number(travelId) },
                    forward: true,
                  },
                })
              }
            />
            <ShareButton onClick={handleShareClick} />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{travel.trvRegion}</div>
          <div>
            {travel.startDate} ~ {travel.endDate}
          </div>
          {/* City isn't explicitly in FullTravel root, might need to derive from days or it's missing in type */}
        </div>

        {travel.days.map(day => (
          <div
            key={day.dayId}
            className={classes.dayTravelRow}
            onClick={() => handleDayClick(day.dayNumber)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{day.dayNumber}일차</h3>
            <div className={classes.dayTravelLocation}>{day.dayRegion}</div>
            <div className={classes.dayTravelPhoto}>
              {day.photos.map((photo, index) => {
                const currentPhotoId = photo.photoId;
                return (
                  <img
                    key={`${currentPhotoId}-${index}`}
                    src={photo.url}
                    alt={`여행 사진 ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          message="여행을 정말로 삭제하시겠습니까?"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showShareModal && sharedUrlData && (
        <ShareModal
          shareUrl={sharedUrlData.data.shareUrl}
          onCancel={handleCloseShareModal}
        />
      )}
    </div>
  );
}
