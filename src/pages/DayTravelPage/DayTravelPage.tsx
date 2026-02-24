import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './DayTravelPage.module.css';
import EditButton from '../../components/Buttons/EditButton/EditButton.tsx';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton.tsx';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton.tsx';
import BackgroundMap from '../../components/Map/Map.tsx';
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import PhotoMarker from '../../components/Map/PhotoMarker.tsx';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';

const PHOTO_MARKER_LATITUDE_OFFSET = 0.007;

export default function DayTravelPage() {
  const navigate = useNavigate();
  // day is dayNumber
  const { travelId, day } = useParams<{ travelId: string; day: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    request: fetchTravel,
  } = useApi(travelService.getTravel);

  const {
    request: deleteTravelDay,
  } = useApi(travelService.deleteTravelDay);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      fetchTravel(Number(travelId), token);
    }
  }, [travelId]);

  if (travelLoading) return <div>Loading...</div>;
  if (travelError) return <div>Error: {travelError}</div>;
  if (!travel) return <div>No data found.</div>;

  // URL 파라미터로 받은 day에 해당하는 데이터 찾기
  const dayNumber = Number(day);
  const dayTravel = travel.days.find(d => d.dayNumber === dayNumber);

  if (!dayTravel) return <div>해당 일차의 여행 데이터가 없습니다.</div>;

  // Safe check for photos
  const safePhotos = dayTravel.photos || [];
  // Use .latitude and .longitude if they exist and are numbers (including 0)
  const validPhotos = safePhotos.filter(p => p.url && p.latitude !== undefined && p.longitude !== undefined);
  const latestPhoto = validPhotos.length > 0 ? validPhotos[0] : null;

  const dailyComment = dayTravel.diary?.content || dayTravel.diaryContent || (typeof dayTravel.diary === 'string' ? dayTravel.diary : undefined); // 일일 코멘트
  const noComment = String('아직 여행일기가 없습니다.');

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (dayTravel.dayId && token) {
      await deleteTravelDay(dayTravel.dayId, token);
      navigate(-1); // Go back after delete
    }
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    navigate(`/travel/${travelId}/${day}/${dayTravel.diary ? "travel-diary-edit-page" : "travel-diary-page"}`);
  };
  const handleBackClick = () => navigate(-1);
  const handlePhotoClick = (photoId: string | number) => {
    navigate(`/photos/${photoId}/travel-photo-comment`);
  };

  return (
    <div className={classes.container}>

      <BackgroundMap position={latestPhoto?.latitude !== undefined && latestPhoto?.longitude !== undefined ? [latestPhoto.latitude as number, latestPhoto.longitude as number] : undefined}>
        {validPhotos.map((p, idx) => (
          <PhotoMarker
            key={idx}
            photoUrl={p.url!}
            position={[p.latitude! + PHOTO_MARKER_LATITUDE_OFFSET, p.longitude!]}
          />
        ))}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <div className={classes.header}>
            <h1>{day}일차</h1>
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
            <div className={`${classes.dailyCommentBox} ${dailyComment ? classes.hasComment : classes.noComment}`} onClick={handleEditClick} >
              {dailyComment ? dailyComment : noComment}
            </div>
            <div className={classes.dayTravelLocation}><h3>{dayTravel.dayRegion}</h3></div>
            <div className={classes.dayTravelPhoto}>
              {safePhotos.map((photo, index) => {
                const currentPhotoId = photo.photoId ?? photo.id;
                return (
                  <img
                    key={`${currentPhotoId}-${index}`}
                    src={photo.url}
                    alt={`여행 사진 ${index + 1}`}
                    onClick={() => currentPhotoId && handlePhotoClick(currentPhotoId)}
                    className={classes.clickablePhoto} />
                );
              })}
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
    </div>
  );
}