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
// import type { FullTravel } from 'src/types/travel.type'; // inferred from service

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
    request: fetchTravel,
  } = useApi(travelService.getTravel);

  const {
    request: deleteTravel,
  } = useApi(travelService.deleteTravel);

  const {
    data: sharedUrlData,
    request: fetchSharedUrl,
  } = useApi(travelService.getSharedUrl);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (travelId) {
      fetchTravel(Number(travelId), token);
    }
  }, [travelId]);

  if (travelLoading) return <div>Loading...</div>;
  if (travelError) return <div>Error: {travelError}</div>;
  if (!travel) return <div>No travel data found.</div>;

  // Photos from all days for the map
  // Note: TravelDay photos type is Partial<FullPhotoData> which has GPSCoordinates
  // We filter out those without valid coordinates
  const allPhotos = travel.days.flatMap(day =>
    (day.photos || []).filter(p => p.url && p.GPSCoordinates?.latitude !== undefined && p.GPSCoordinates?.longitude !== undefined)
  );

  // Map center: representatitve photo or first photo
  const mapCenter = allPhotos.length > 0 && allPhotos[0].GPSCoordinates
    ? { lat: allPhotos[0].GPSCoordinates.latitude, lng: allPhotos[0].GPSCoordinates.longitude }
    : undefined;

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    if (travelId && token) {
      await deleteTravel(Number(travelId), token);
      navigate('/my-travel'); // Go back to list after delete
    }
    setShowDeleteModal(false);
  };

  const handleShareClick = async () => {
    const token = localStorage.getItem('token');
    if (travelId && token) {
      await fetchSharedUrl(Number(travelId), token);
      setShowShareModal(true);
    }
  };

  const handleCloseShareModal = () => setShowShareModal(false);

  const handleDayClick = (dayNumber: number) => {
    navigate(`./${dayNumber}`);
  };

  const handleBackClick = () => navigate('/my-travel');

  return (
    <div className={classes.container}>

      <BackgroundMap position={mapCenter ? [mapCenter.lat, mapCenter.lng] : undefined}>
        {allPhotos.map((photo, index) => (
          photo.GPSCoordinates ? (
            <PhotoMarker
              key={`${photo.id}-${index}`}
              position={[photo.GPSCoordinates.latitude + 0.007, photo.GPSCoordinates.longitude]}
              photoUrl={photo.url!}
            />
          ) : null
        ))}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <h1 className={classes.header}>{travel.title}</h1>

          <div className={classes.buttonGroup}>
            <EditButton />
            <ShareButton onClick={handleShareClick} />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{travel.startDate} ~ {travel.endDate}</div>
          {/* City isn't explicitly in FullTravel root, might need to derive from days or it's missing in type */}
        </div>

        {travel.days.map((day) => (
          <div
            key={day.dayId}
            className={classes.dayTravelRow}
            onClick={() => handleDayClick(day.dayNumber)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{day.dayNumber}일차</h3>
            <div className={classes.dayTravelLocation}>{day.dayRegion}</div>
            <div className={classes.dayTravelPhoto}>
              {day.photos.map((photo, index) => (
                <img
                  key={`${photo.id}-${index}`}
                  src={photo.url}
                  alt={`여행 사진 ${index + 1}`}
                />
              ))}
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
        <ShareModal shareUrl={sharedUrlData.data[0].shareUrl} onCancel={handleCloseShareModal} />
      )}
    </div>
  );
}
