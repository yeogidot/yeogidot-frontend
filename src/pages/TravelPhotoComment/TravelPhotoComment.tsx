import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './TravelPhotoComment.module.css'
import BackButton from 'src/components/Buttons/BackButton/GrayBackButton/GrayBackButton'
import DeleteButton from 'src/components/Buttons/DeleteButton/DeleteButton'
import { samplePhotoComments } from '../../data/sampleTravelData.ts'
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import Button from '@components/Buttons/Button/Button';

export default function TravelPhotoComment() {
  const { photoId } = useParams<{ photoId: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 해당 사진에 맞는 코멘트 데이터 찾기
  const photoComment = samplePhotoComments.find(
    comment => comment.photoId === photoId
  ) || samplePhotoComments[0]; // 기본값으로 첫 번째 항목 사용

  // 날짜 포맷팅 함수
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  const navigate = useNavigate()
  const handleBackClick = () => navigate(-1);
  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };
  // 현재 뒤로가는 부분만 구현, 백엔드 연동시 글 저장까지 구현 예정
  const handleFinishClick = () => navigate(-1);

  return (
    <div className={classes.container}>
      <div className={classes.topPanel}>
        <div className={classes.dayTravelPhoto}>
          <img
            src={photoComment.photo.url}
            alt={`여행 사진 ${photoComment.photoId}`}
          />
        </div>

        <div className={classes.backButtonWrapper}>
            <BackButton onClick={handleBackClick}/>
        </div>
      </div>
      
      <div className={classes.bottomPanel}>
        <div className={classes.headerRow}>
          <h1>코멘트</h1>
          <div className={classes.deleteButtonWrapper}>
              <DeleteButton onClick={handleDeleteClick} />
          </div>
        </div>

        <div className={classes.photoInformation}>
            <a>부산여행:{photoComment.day}일차</a>
            <br/>
            {formatDate(photoComment.photo.timestamp)}
            <br/>
            {/* 위치 정보는 실제로는 역지오코딩으로 얻어야 하지만, 샘플에서는 고정 값 사용 */}
            부산광역시 부산진구
        </div>
        <div
          className={`${classes.textAreaWrapper} ${
            !photoComment.existingComment ? classes.placeholder : ''
          }`}
          contentEditable
          suppressContentEditableWarning>
          {photoComment.existingComment || photoComment.placeholder}
        </div>


        <div className={classes.finishButton}>
          <Button onClick={handleFinishClick}>{photoComment.existingComment ? '수정' : '작성'}</Button>
        </div>
      </div>
      
      {showDeleteModal && (
        <DeleteConfirmModal
          message="사진과 코멘트를 정말로 삭제하시겠습니까?"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
