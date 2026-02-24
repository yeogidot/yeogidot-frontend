import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './TravelPhotoComment.module.css'
import BackButton from 'src/components/Buttons/BackButton/GrayBackButton/GrayBackButton'
import DeleteButton from 'src/components/Buttons/DeleteButton/DeleteButton'
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal.tsx';
import Button from '@components/Buttons/Button/Button';
import FullPhotoLayout from '@components/FullPhotoLayout/FullPhotoLayout';
import type { DatedPhotoData, FullPhoto } from 'src/types/photo.type';
import { photoService } from 'src/apis/services/photo';
import { useApi } from 'src/hooks/api';

// Local interface since we cannot change types/photo.type.ts
interface FullPhotoWithComment extends FullPhoto {
  comment?: {
    id: number;
    content: string;
  };
}

export default function TravelPhotoComment() {
  const { photoId } = useParams<{ photoId: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFullPhoto, setIsFullPhoto] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false); // To track if we are editing an existing comment
  const divRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()

  const {
    data: rawPhoto,
    loading: photoLoading,
    error: photoError,
    request: fetchPhoto,
  } = useApi(photoService.getPhoto);

  const photo = rawPhoto as FullPhotoWithComment | undefined;

  const {
    request: writeComment
  } = useApi(photoService.writePhotoComment);

  // const {
  //   request: updateComment
  // } = useApi(photoService.updatePhotoComment);

  // const {
  //   request: deleteComment
  // } = useApi(photoService.deletePhotoComment);

  const {
    request: deletePhoto
  } = useApi(photoService.deletePhoto);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (photoId && token) {
      fetchPhoto(Number(photoId), token);
    }
  }, [photoId]);

  useEffect(() => {
    if (photo?.comment) {
      setCommentText(photo.comment.content);
      setIsEditing(true);
      if (divRef.current) {
        divRef.current.innerText = photo.comment.content;
      }
    } else {
      setIsEditing(false);
      if (divRef.current) {
        divRef.current.innerText = '';
      }
    }
  }, [photo]);

  if (photoLoading) return <div>Loading...</div>;
  if (photoError) return <div>Error: {photoError}</div>;
  if (!photo) return <div>No photo data.</div>;

  // 날짜 포맷팅 함수
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
      // 사진 자체를 삭제
      await deletePhoto(Number(photoId), token);
      navigate(-1);
    }
    setShowDeleteModal(false);
  };

  const handleFinishClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token || !photoId) return;

    const content = divRef.current?.innerText || '';
    if (!content.trim()) return;

    try {
      if (isEditing && photo.comment) {
        // Update: photo.ts를 수정하지 못하므로 여기서 직접 http.put 호출 또는 로직 처리
        // 만약 photoService.updatePhotoComment가 content를 안 받는다면, 
        // 직접 http 요청을 보내 인수를 해결함.
        const { http } = await import('src/apis/http');
        await http.put(`/api/comments/${photo.comment.id}`, { content }, token);
      } else {
        // Create
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

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setCommentText(e.currentTarget.innerText);
  };

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
          {/* Need travel day info? photo doesn't have it directly. 
               We might need to pass it or fetch it. 
               For now showing what we have. 
           */}
          <a>{formatDate(photo.takenAt)}</a>
          <br />
          {/* Location? photo metadata region or coordinates */}
          {photo.region ? photo.region : (photo.latitude && photo.longitude ? `${photo.latitude}, ${photo.longitude}` : '')}
        </div>
        <div
          className={`${classes.textAreaWrapper} ${!commentText ? classes.placeholder : ''}`}
          contentEditable
          suppressContentEditableWarning
          ref={divRef}
          onInput={handleInput}
          data-placeholder="코멘트를 입력하세요."
        >
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
