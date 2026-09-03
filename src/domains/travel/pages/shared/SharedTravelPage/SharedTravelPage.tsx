import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppScheme } from 'src/hooks/useAppScheme';
import AppLaunchBanner from '@components/AppLaunchBanner/AppLaunchBanner';
import classes from './SharedTravelPage.module.css';
import BackgroundMap from '../../../components/Map/Map.tsx';
import PhotoMarker from '../../../components/Map/PhotoMarker.tsx';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';
import ErrorPage from '@components/ErrorPage/ErrorPage.tsx';

const MAP_CENTER_LATITUDE_OFFSET = 0.007;

export default function SharedTravelPage() {
  const navigate = useNavigate();
  const { shareToken } = useParams<{ shareToken: string }>();
  const { isMobile, launchAppScheme } = useAppScheme(shareToken);

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
  if (travelError)
    return <ErrorPage status={travelStatus} message={travelError} />;
  if (!travel) return <div>여행 데이터를 찾을 수 없습니다.</div>;

  const allPhotos = travel.days.flatMap(day =>
    (day.photos || []).filter(
      p =>
        p.url &&
        p.latitude !== null &&
        p.longitude !== null &&
        p.latitude !== undefined &&
        p.longitude !== undefined
    )
  );

  const mapCenter =
    allPhotos.length > 0 &&
    allPhotos[0].latitude !== null &&
    allPhotos[0].longitude !== null &&
    allPhotos[0].latitude !== undefined &&
    allPhotos[0].longitude !== undefined
      ? { lat: allPhotos[0].latitude, lng: allPhotos[0].longitude }
      : undefined;

  const handleDayClick = (dayNumber: number) => {
    navigate(`./${dayNumber}`, {
      viewTransition: true,
      state: { forward: true },
    });
  };

  const handlePhotoClick = (photoId: string | number) => {
    navigate(`/share/${shareToken}/photos/${photoId}/comment`);
  };

  return (
    <div className={classes.container}>
      <BackgroundMap
        position={
          mapCenter
            ? [
                (mapCenter.lat as number) - MAP_CENTER_LATITUDE_OFFSET,
                mapCenter.lng as number,
              ]
            : undefined
        }
      >
        {allPhotos.map((photo, index) => {
          const currentPhotoId = photo.photoId ?? (photo as any).id;
          return (
            <PhotoMarker
              key={`${currentPhotoId}-${index}`}
              position={[photo.latitude!, photo.longitude!]}
              photoUrl={photo.url!}
              onClick={() => currentPhotoId && handlePhotoClick(currentPhotoId)}
            />
          );
        })}
      </BackgroundMap>

      <div className={classes.panel}>
        <div className={classes.headerRow}>
          <div className={classes.header}>
            {travel.title.length > 10
              ? travel.title.slice(0, 10) + '...'
              : travel.title}
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>{travel.trvRegion}</div>
          <div>
            {travel.startDate} ~ {travel.endDate}
          </div>
        </div>

        {travel.days.map(day => (
          <div
            key={day.dayId}
            className={classes.dayTravelRow}
            onClick={() => handleDayClick(day.dayNumber)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{day.dayNumber}일차</h3>
            <div className={classes.dayTravelLocation}>{day.dayRegion}</div>
            <div className={classes.dayTravelPhoto}>
              {day.photos.map((photo, index) => {
                const currentPhotoId = photo.photoId;
                return (
                  <img
                    key={`${currentPhotoId}-${index}`}
                    src={photo.url}
                    alt={`여행 사진 ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {isMobile && <AppLaunchBanner onAppLaunch={launchAppScheme} />}
    </div>
  );
}
