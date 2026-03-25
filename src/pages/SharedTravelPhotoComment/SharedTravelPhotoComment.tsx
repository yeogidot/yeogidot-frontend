import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './SharedTravelPhotoComment.module.css';
import BackButton from 'src/components/Buttons/BackButton/GrayBackButton/GrayBackButton';
import FullPhotoLayout from '@components/FullPhotoLayout/FullPhotoLayout';
import type { DatedPhotoData, FullPhoto } from 'src/types/photo.type';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';

export default function SharedTravelPhotoComment() {
  const { shareToken, photoId } = useParams<{
    shareToken: string;
    photoId: string;
  }>();
  const [isFullPhoto, setIsFullPhoto] = useState(false);
  const navigate = useNavigate();

  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    request: fetchSharedTravel,
  } = useApi(travelService.getSharedTravel);

  useEffect(() => {
    if (shareToken) {
      fetchSharedTravel(shareToken);
    }
  }, [shareToken, fetchSharedTravel]);

  // Find the photo and its latest comment
  let photo: FullPhoto | undefined;
  if (travel && photoId) {
    const allPhotos = travel.days.flatMap(day => day.photos as FullPhoto[]);
    photo = allPhotos.find(p => p.photoId === Number(photoId));
  }

  if (travelLoading) return <div>Loading...</div>;
  if (travelError) return <div>Error: {travelError}</div>;
  if (!travel || !photo) return <div>데이터를 찾을 수 없습니다.</div>;

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const latestComment =
    photo.comments && photo.comments.length > 0
      ? [...photo.comments].sort((a, b) => b.commentId - a.commentId)[0]
      : null;

  const datedPhotoData: DatedPhotoData = {
    id: photo.photoId ?? Number(photoId),
    url: photo.url || '',
    date: photo.createdDate || new Date().toISOString(),
    file: new File([], photo.originalName ?? 'photo'),
    isThumbnail: false,
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
            onClick={() => setIsFullPhoto(true)}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className={classes.backButtonWrapper}>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>

      <div className={classes.bottomPanel}>
        <div className={classes.headerRow}>
          <h1>코멘트</h1>
        </div>

        <div className={classes.photoInformation}>
          <a>{formatDate(photo.takenAt)}</a>
          <br />
          {photo.region
            ? photo.region
            : photo.latitude && photo.longitude
              ? `${photo.latitude}, ${photo.longitude}`
              : ''}
        </div>

        <div className={classes.textAreaContainer}>
          <div
            className={`${classes.commentBox} ${!latestComment ? classes.noComment : ''}`}
          >
            {latestComment
              ? latestComment.content
              : '작성된 코멘트가 없습니다.'}
          </div>
        </div>
      </div>
    </div>
  );
}
