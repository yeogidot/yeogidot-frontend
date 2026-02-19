import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './DayTravelPage.module.css';
import EditButton from '../../components/Buttons/EditButton/EditButton.tsx';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton.tsx';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton.tsx';
import BackgroundMap from '../../components/Map/Map.tsx';
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import ShareModal from '../../components/Modal/ShareModal.tsx';
import PhotoMarker from '../../components/Map/PhotoMarker.tsx';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';

const SHARE_URL = 'https://travel.vercel.com/1234df'; // This might need to be dynamic if sharing day specifically is supported, otherwise keep static or fetch from somewhere

export default function DayTravelPage() {
  const navigate = useNavigate();
  // day is dayNumber
  const { travelId, day } = useParams<{ travelId: string; day: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const {
    data: dayTravel,
    loading: dayTravelLoading,
    error: dayTravelError,
    request: fetchDayTravel,
  } = useApi(travelService.getTravelDay);

  const {
    request: deleteTravelDay,
  } = useApi(travelService.deleteTravelDay);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (travelId && day) {
      fetchDayTravel(Number(travelId), Number(day), token);
    }
  }, [travelId, day]);

  if (dayTravelLoading) return <div>Loading...</div>;
  if (dayTravelError) return <div>Error: {dayTravelError}</div>;
  if (!dayTravel) return <div>No data found.</div>;

  // Safe check for photos
  const safePhotos = dayTravel.photos || [];
  const latestPhoto = safePhotos.length > 0 ? safePhotos[0] : null;
  // Sorting might be needed if backend doesn't sort

  const dailyComment = dayTravel.diary?.content; // 일일 코멘트
  const noComment = String('아직 여행일기가 없습니다.');

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    if (dayTravel.dayId && token) {
      await deleteTravelDay(dayTravel.dayId, token);
      navigate(-1); // Go back after delete
    }
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    navigate(`/travel/${travelId}/${day}/${dailyComment ? "travel-diary-edit-page" : "travel-diary-page"}`);
  };
  const handleCloseShareModal = () => setShowShareModal(false);
  const handleBackClick = () => navigate(-1);
  const handlePhotoClick = (photoId: string | number) => {
    navigate(`/photos/${photoId}/travel-photo-comment`);
  };

  return (
    <div className={classes.container}>

      <BackgroundMap position={latestPhoto?.GPSCoordinates ? [latestPhoto.GPSCoordinates.latitude, latestPhoto.GPSCoordinates.longitude] : undefined}>
        {safePhotos.map((p, idx) => (
          p.GPSCoordinates ? (
            <PhotoMarker
              key={idx}
              photoUrl={p.url!}
              position={[p.GPSCoordinates.latitude + 0.007, p.GPSCoordinates.longitude]}
            />
          ) : null
        ))}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <div className={classes.header}>
            {/* Title might need to come from parent travel or we just show day number */}
            <h1>{day}일차</h1>
            {/* <h2>{dayTravel.date}</h2> */}
          </div>
          <div className={classes.buttonGroup}>
            <EditButton />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{dayTravel.dayRegion}</div>
          <div>{dayTravel.date}</div>
          <div className={classes.dayTravelRow}>
            {/* <h3>Title?</h3> Day object doesn't have title similar to sample data '1일차'. We used day number above. */}
            <div className={`${classes.dailyCommentBox} ${dailyComment ? classes.hasComment : classes.noComment}`} onClick={handleEditClick} >
              {dailyComment ? dailyComment : noComment}
            </div>
            {/* locations might be granular region info, but we have dayRegion */}
            <div className={classes.dayTravelLocation}><h3>{dayTravel.dayRegion}</h3></div>
            <div className={classes.dayTravelPhoto}>
              {safePhotos.map((photo, index) => (
                <img
                  key={`${photo.id}-${index}`}
                  src={photo.url}
                  alt={`여행 사진 ${index + 1}`}
                  onClick={() => handlePhotoClick(photo.id!)}
                  className={classes.clickablePhoto} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteConfirmModal
          message="해당 일차 여행을 정말로 삭제하시겠습니까?"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showShareModal && (
        <ShareModal shareUrl={SHARE_URL} onCancel={handleCloseShareModal} />
      )}
    </div>
  );
}