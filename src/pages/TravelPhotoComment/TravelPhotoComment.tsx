import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './TravelPhotoComment.module.css'
import BackButton from 'src/components/Buttons/BackButton/GrayBackButton/GrayBackButton'
import DeleteButton from 'src/components/Buttons/DeleteButton/DeleteButton'
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import Button from '@components/Buttons/Button/Button';
import FullPhotoLayout from '@components/FullPhotoLayout/FullPhotoLayout';
import type { DatedPhotoData, FullPhoto } from 'src/types/photo.type';
import { photoService } from 'src/apis/services/photo';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';
import ErrorPage from '../ErrorPage/ErrorPage.tsx';

export default function TravelPhotoComment() {
  const { travelId, photoId } = useParams<{ travelId: string; photoId: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFullPhoto, setIsFullPhoto] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<number | null>(null);

  const navigate = useNavigate()

  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    status: travelStatus,
    request: fetchTravel,
  } = useApi(travelService.getTravel);

  const {
    status: writeStatus,
    request: writeComment,
    reset: resetWrite
  } = useApi(photoService.writePhotoComment);

  const {
    status: updateStatus,
    request: updateComment,
    reset: resetUpdate
  } = useApi(photoService.updatePhotoComment);

  const {
    request: deletePhoto
  } = useApi(photoService.deletePhoto);

  useEffect(() => {
    if (writeStatus === 201) {
      const token = localStorage.getItem('accessToken');
      if (travelId && token) {
        fetchTravel(Number(travelId), token);
      }
      alert('코멘트가 성공적으로 저장되었습니다.');
      resetWrite();
    } else if (writeStatus !== null) {
      alert('코멘트 저장 중 오류가 발생했습니다.');
      resetWrite();
    }
  }, [writeStatus, travelId, fetchTravel, resetWrite]);

  useEffect(() => {
    if (updateStatus === 200) {
      const token = localStorage.getItem('accessToken');
      if (travelId && token) {
        fetchTravel(Number(travelId), token);
      }
      alert('코멘트가 성공적으로 저장되었습니다.');
      resetUpdate();
    } else if (updateStatus !== null) {
      alert('코멘트 수정 중 오류가 발생했습니다.');
      resetUpdate();
    }
  }, [updateStatus, travelId, fetchTravel, resetUpdate]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      fetchTravel(Number(travelId), token);
    }
  }, [travelId, fetchTravel]);

  // Find the photo and its latest comment
  let photo: FullPhoto | undefined;
  if (travel && photoId) {
    const allPhotos = travel.days.flatMap(day => day.photos as FullPhoto[]);
    photo = allPhotos.find(p => p.photoId === Number(photoId));
  }

  useEffect(() => {
    if (photo?.comments && photo.comments.length > 0) {
      // Find comment with highest commentId
      const latestComment = [...photo.comments].sort((a, b) => b.commentId - a.commentId)[0];
      setCommentText(latestComment.content);
      setIsEditing(true);
      setCurrentCommentId(latestComment.commentId);
    } else {
      setCommentText('');
      setIsEditing(false);
      setCurrentCommentId(null);
    }
  }, [photo]);

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const handleBackClick = () => navigate(-1);
  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (token && photoId) {
      await deletePhoto(Number(photoId), token);
      navigate(-1);
    }
    setShowDeleteModal(false);
  };

  const handleFinishClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token || !photoId) return;

    const content = commentText.trim();
    if (!content) return;

    try {
      if (isEditing && currentCommentId) {
        await updateComment(Number(photoId), content, token);
      } else {
        await writeComment(Number(photoId), content, token);
      }
    } catch (error) {
      console.error('코멘트 저장 실패:', error);
      alert('코멘트 저장 중 오류가 발생했습니다.');
    }
  };

  const handlePhotoClick = () => {
    setIsFullPhoto(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    const textarea = document.querySelector(`.${classes.textAreaWrapper}`) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [commentText]);

  if (travelLoading) return <div>Loading...</div>;
  if (travelError) return <ErrorPage status={travelStatus} message={travelError} />;
  if (!travel || !photo) return <ErrorPage status={404} message="No data found." />;

  const datedPhotoData: DatedPhotoData = {
    id: photo.photoId ?? Number(photoId),
    url: photo.url || '',
    date: photo.createdDate || new Date().toISOString(),
    file: new File([], photo.originalName ?? 'photo'),
    isThumbnail: false
  };

  if (isFullPhoto) {
    return (
      <FullPhotoLayout photo={datedPhotoData}>
        <div className={classes.backButtonWrapper} style={{ zIndex: 10 }}>
          <BackButton onClick={() => setIsFullPhoto(false)} />
        </div>
      </FullPhotoLayout>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.topPanel}>
        <div className={classes.dayTravelPhoto}>
          <img
            src={photo.url}
            alt={`여행 사진 ${photoId}`}
            onClick={handlePhotoClick}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className={classes.backButtonWrapper}>
          <BackButton onClick={handleBackClick} />
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
          <a>{formatDate(photo.takenAt)}</a>
          <br />
          {/* @ts-expect-error: region is not in FullPhoto type but present in API response */}
          {photo.region ? photo.region : (photo.latitude && photo.longitude ? `${photo.latitude}, ${photo.longitude}` : '')}
        </div>
        
        <div className={classes.textAreaContainer}>
           <textarea
            className={classes.textAreaWrapper}
            value={commentText}
            onChange={handleInputChange}
            placeholder="코멘트를 입력하세요."
          />
        </div>

        <div className={classes.finishButton}>
          <Button onClick={handleFinishClick}>{isEditing ? '수정' : '작성'}</Button>
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
