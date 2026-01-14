import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import classes from './TravelPage.module.css';
import EditButton from '../../components/Buttons/EditButton/EditButton.tsx';
import ShareButton from '../../components/Buttons/ShareButton/ShareButton.tsx';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton.tsx';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton.tsx';
import BackgroundMap from '../../components/Map/Map.tsx';
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import ShareModal from '../../components/Modal/ShareModal.tsx';
import PhotoMarker from '../../components/Map/PhotoMarker.tsx';
import { samplePhotos } from 'src/data/samplePhotos';
import { sampleTravelData, sampleDayTravels } from 'src/data/sampleTravelData';

// 오래된 사진 순서대로 정렬
const sortedPhotos = [...samplePhotos].sort(
  (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
);

const mapCenter = sortedPhotos[0].location; // 가장 오래된 사진 위치를 중심으로


const SHARE_URL = 'https://travel.vercel.com/1234df';

export default function TravelPage() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    // TODO: wire up actual delete handler when backend is ready
    setShowDeleteModal(false);
  };
  const handleShareClick = () => setShowShareModal(true);
  const handleCloseShareModal = () => setShowShareModal(false);
  const handleDayClick = () => navigate(`./${sampleDayTravels[0].day}`);
  const handleBackClick = () => navigate('/mytravel');

  return (
    <div className={classes.container}>

      <BackgroundMap center={mapCenter}>
        {samplePhotos.map((photo, index) => (
          <PhotoMarker key={index} position={[photo.location[0] + 0.007, photo.location[1]]} photoUrl={photo.url} />
        ))}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <h1 className={classes.header}>{sampleTravelData.title}</h1>

          <div className={classes.buttonGroup}>
            <EditButton />
            <ShareButton onClick={handleShareClick} />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{sampleTravelData.city}</div>
          <div>{sampleTravelData.period}</div>
        </div>
        <div className={classes.dayTravelRow} onClick={handleDayClick} style={{ cursor: 'pointer' }}>
            <h3>{sampleDayTravels[0].day}일차</h3>
            <div className={classes.dayTravelLocation}>{sampleDayTravels[0].locations}</div>
            <div className={classes.dayTravelPhoto}>
              {sampleDayTravels[0].photos.map((photo, index) => (
              <img
                key={`${photo.url}-${index}`}
                src={photo.url}
                alt={`여행 사진 ${index + 1}`}
              />
            ))}
            </div>
          </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          message="여행을 정말로 삭제하시겠습니까?"
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
