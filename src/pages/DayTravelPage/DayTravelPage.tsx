import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './DayTravelPage.module.css';
import EditButton from '../../components/Buttons/EditButton/EditButton.tsx';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton.tsx';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton.tsx';
import BackgroundMap from '../../components/Map/Map.tsx';
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import ShareModal from '../../components/Modal/ShareModal.tsx';
import PhotoMarker from '../../components/Map/PhotoMarker.tsx';
import { samplePhotos } from 'src/data/samplePhotos.ts';
import { sampleTravelData, sampleDayTravels } from 'src/data/sampleTravelData.ts';

const oldestPhoto = [...samplePhotos].sort(
  (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
)[0];
const SHARE_URL = 'https://travel.vercel.com/1234df';

export default function DayTravelPage() {
  const navigate = useNavigate();
  const { travelId, day } = useParams<{ travelId: string; day: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const dayTravelData = sampleDayTravels[0]; // 현재는 1일차 데이터만 사용
  const dailyComment = dayTravelData.diary; // 일일 코멘트

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };
  const handleEditClick = () => {
    navigate(`/travel/${travelId}/${day}/writeTravelDiaryPage`);
  };
  const handleCloseShareModal = () => setShowShareModal(false);
  const handleBackClick = () => navigate(-1);
  const handlePhotoClick = (photoId: string | number) => {
    navigate(`/photos/${photoId}/WriteTravelPhotoComment`);
  };
  return (
    <div className={classes.container}>

      <BackgroundMap center={oldestPhoto.location}>
        {samplePhotos.map((p, idx) => (
          <PhotoMarker
            key={idx}
            photoUrl={p.url}
            position={[p.location[0] + 0.007, p.location[1]]}
          />
        ))}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <div className={classes.header}>
            <h1>부산 여행</h1>
            <h2>1일차</h2>
          </div>
          <div className={classes.buttonGroup}>
            <EditButton onClick={handleEditClick} />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{sampleTravelData.city}</div>
          <div>{sampleTravelData.period}</div>
          <div className={classes.dayTravelRow}>
            <h3>{dayTravelData.title}</h3>
            <div className={`${classes.dailyCommentBox} ${dailyComment ? classes.hasComment : classes.noComment}`}>
              {dailyComment ? dailyComment : '아직 여행일기가 없습니다.'}
            </div>
            <div className={classes.dayTravelLocation}><h3>{dayTravelData.locations}</h3></div>
            <div className={classes.dayTravelPhoto}>
              {dayTravelData.photos.map((photo, index) => (
                <img
                  key={`${photo.url}-${index}`}
                  src={photo.url}
                  alt={`여행 사진 ${index + 1}`}
                  onClick={() => handlePhotoClick(index + 1)}
                  className={classes.clickablePhoto}/>
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