import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './SharedDayTravelPage.module.css';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton.tsx';
import BackgroundMap from '../../components/Map/Map.tsx';
import PhotoMarker from '../../components/Map/PhotoMarker.tsx';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';
import ErrorPage from '../ErrorPage/ErrorPage.tsx';

const MAP_CENTER_LATITUDE_OFFSET = 0.007;



export default function SharedDayTravelPage() {
  const navigate = useNavigate();
  const {shareToken, day } = useParams<{ shareToken: string; day: string }>();

  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    status: travelStatus,
    request: fetchSharedTravel,
  } = useApi(travelService.getSharedTravel);

  useEffect(() => {
    if (shareToken) {
      fetchSharedTravel(shareToken);
    }
  }, [shareToken, fetchSharedTravel]);

  if (travelLoading) return <div>Loading...</div>;
  if (travelError) return <ErrorPage status={travelStatus} message={travelError} />;
  if (!travel) return <div>여행 데이터를 찾을 수 없습니다.</div>;

  const dayNumber = Number(day);
  const dayTravel = travel.days.find(d => d.dayNumber === dayNumber);

  if (!dayTravel) return <div>해당 일차의 여행 데이터가 없습니다.</div>;

  const safePhotos = dayTravel.photos || [];
  const validPhotos = safePhotos.filter(p => p.url && p.latitude !== undefined && p.longitude !== undefined);
  const latestPhoto = validPhotos.length > 0 ? validPhotos[0] : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyComment = dayTravel.diary?.content || (dayTravel as any).diaryContent || (typeof dayTravel.diary === 'string' ? dayTravel.diary : undefined);
  const noComment = '아직 여행일기가 없습니다.';

  const handleBackClick = () => navigate(-1);
  const handlePhotoClick = (photoId: string | number) => {
    navigate(`/share/${shareToken}/photos/${photoId}/comment`, {
      viewTransition: true,
      state: { forward: true },
    });
  };

  return (
    <div className={classes.container}>
      <BackgroundMap position={latestPhoto?.latitude !== undefined && latestPhoto?.longitude !== undefined ? [(latestPhoto.latitude as number) - MAP_CENTER_LATITUDE_OFFSET, latestPhoto.longitude as number] : undefined}>
        {validPhotos.map((p, idx) => (
          <PhotoMarker
            key={idx}
            photoUrl={p.url!}
            position={[p.latitude!, p.longitude!]}
            onClick={() => p.photoId && handlePhotoClick(p.photoId)}
          />
        ))}
      </BackgroundMap>

      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>

      <div className={classes.panel}>
        <div className={classes.headerRow}>
          <div className={classes.header}>
            <h1>{travel.title.length > 10 ? travel.title.slice(0, 10) + '...' : travel.title}</h1>
            <h2>{day}일차</h2>
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{dayTravel.dayRegion}</div>
          <div>{dayTravel.date}</div>
          <h3>{day}일차 여행일기</h3>
          
          <div className={classes.dayTravelRow}>
            <div className={`${classes.dailyCommentBox} ${!dailyComment ? classes.noComment : ''}`}>
              {dailyComment ? dailyComment : noComment}
            </div>
            
            <div className={classes.dayTravelLocation}>
              <h3>{dayTravel.dayRegion}</h3>
            </div>
            
            <div className={classes.dayTravelPhoto}>
              {safePhotos.map((photo, index) => {
                const currentPhotoId = photo.photoId ?? (photo as any).id;
                return (
                  <img
                    key={`${currentPhotoId}-${index}`}
                    src={photo.url}
                    alt={`여행 사진 ${index + 1}`}
                    onClick={() => currentPhotoId && handlePhotoClick(currentPhotoId)}
                    className={classes.clickablePhoto}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
