import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './DayTravelPage.module.css';
import EditButton from '../../component/Buttons/EditButton.tsx';
import DeleteButton from '../../component/Buttons/DeleteButton.tsx';
import BackButton from '../../component/Buttons/BackButton.tsx';
import BackgroundMap from '../../component/map/map.tsx';
import DeleteConfirmModal from '../../component/modal/DeleteConfirmModal';
import ShareModal from '../../component/modal/ShareModal';
import SamplePhoto1 from '../../assets/images/samplePhoto1.jpg';
import SamplePhoto2 from '../../assets/images/samplePhoto2.jpg';
import SamplePhoto3 from '../../assets/images/samplePhoto3.jpg';

const SHARE_URL = 'https://travel.vercel.com/1234df';

export default function TravelPage() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const dailyComment = '많이 걸어서 힘들었지만 재미있었음'; // 일일 코멘트 (없으면 null 또는 빈 문자열)

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    // TODO: wire up actual delete handler when backend is ready
    setShowDeleteModal(false);
  };
  const handleCloseShareModal = () => setShowShareModal(false);
  const handleBackClick = () => navigate('/travel');

  return (
    <div className={classes.container}>

      <BackgroundMap />
      <BackButton onClick={handleBackClick} />
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <h1 className={classes.header}>부산 여행</h1>

          <div className={classes.buttonGroup}>
            <EditButton />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>부산광역시</div>
          <div>2025-10-16 ~ 2025-10-18</div>
          <div className={classes.dayTravelRow}>
            <h3>1일차 여행일기</h3>
            <div className={`${classes.dailyCommentBox} ${dailyComment ? classes.hasComment : classes.noComment}`}>
              {dailyComment ? dailyComment : '아직 여행일기가 없습니다.'}
            </div>
            <div className={classes.dayTravelLocation}><h3>부산광역시 부산진구, 수영구</h3></div>
            <div className={classes.dayTravelPhoto}>
              {[SamplePhoto1, SamplePhoto2, SamplePhoto3, SamplePhoto1].map((photo, index) => (
                <img key={`${photo}-${index}`} src={photo} alt={`여행 사진 ${index + 1}`} />
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
