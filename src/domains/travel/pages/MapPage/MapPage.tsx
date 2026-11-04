import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomOverlay } from 'react-naver-maps';
import BackgroundMap from '../../components/Map/Map';
import MapPhotoMarker from '../../components/Map/MapPhotoMarker';
import SelectedPhotoCard from '../../components/Map/SelectedPhotoCard';
import AppBar from '@components/AppBar/AppBar';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import { photoService } from 'src/apis/services/photo';
import type { PhotoMarkerData } from '../../types/photo.type';
import classes from './MapPage.module.css';

// Default center (Busan) used when there are no photos with location
const DEFAULT_CENTER = { lat: 35.1796, lng: 129.0756 };

type SelectedPhotoInfo = {
  takenAt: string | null;
  region: string | null;
};

export default function MapPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoMarkerData[]>([]);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [isPhotosLoaded, setIsPhotosLoaded] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [selectedPhotoInfo, setSelectedPhotoInfo] =
    useState<SelectedPhotoInfo | null>(null);

  const selectedPhoto = photos.find(photo => photo.photoId === selectedPhotoId);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // TODO: Replace with actual token management
        const token = localStorage.getItem('accessToken') || '';
        const response = await photoService.getPhotosForMap(token);

        if (response.data) {
          const validPhotos = response.data.filter(
            photo => photo.latitude != null && photo.longitude != null
          );

          setPhotos(validPhotos);

          // If there are photos, center the map on the latest one (first in sorted list)
          if (
            validPhotos.length > 0 &&
            validPhotos[0].latitude != null &&
            validPhotos[0].longitude != null
          ) {
            setMapCenter({
              lat: validPhotos[0].latitude,
              lng: validPhotos[0].longitude,
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch photos for map:', error);
      } finally {
        setIsPhotosLoaded(true);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    if (selectedPhotoId === null) return;

    let ignore = false;

    const fetchSelectedPhotoInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken') || '';
        const response = await photoService.getPhoto(selectedPhotoId, token);

        if (!ignore && response.data) {
          setSelectedPhotoInfo({
            takenAt: response.data.takenAt ?? null,
            region: response.data.region ?? null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch selected photo info:', error);
      }
    };

    fetchSelectedPhotoInfo();

    return () => {
      ignore = true;
    };
  }, [selectedPhotoId]);

  const handleSelectPhoto = (photoId: number) => {
    setSelectedPhotoId(photoId);
    setSelectedPhotoInfo(null);
  };

  const handleViewPhoto = async (photoId: number) => {
    try {
      const token = localStorage.getItem('accessToken') || '';

      // We must find the travelId that contains this photoId
      // because the photo object doesn't have travelId and TravelPhotoComment requires it.
      const travelsRes = await import('src/apis/services/travel').then(m =>
        m.travelService.getTravels(token)
      );
      if (!travelsRes.data) return;

      for (const travel of travelsRes.data) {
        const detailRes = await import('src/apis/services/travel').then(m =>
          m.travelService.getTravel(travel.travelId, token)
        );
        if (detailRes.data) {
          const allPhotos = detailRes.data.days.flatMap(day => day.photos);
          if (allPhotos.find(p => p.photoId === photoId)) {
            navigate(
              `/travel/${travel.travelId}/photos/${photoId}/travel-photo-comment`,
              { viewTransition: true, state: { forward: true } }
            );
            return;
          }
        }
      }

      alert('이 사진이 포함된 여행을 찾을 수 없습니다.');
    } catch (e) {
      console.error(e);
      alert('여행 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={classes.container}>
      <AppBar title="지도" />

      <div className={classes.mapArea}>
        {isPhotosLoaded ? (
          <BackgroundMap position={mapCenter}>
            {photos.map(photo =>
              photo.latitude && photo.longitude ? (
                <CustomOverlay
                  key={photo.photoId}
                  position={{ lat: photo.latitude, lng: photo.longitude }}
                >
                  <MapPhotoMarker
                    photoUrl={photo.thumbnailUrl}
                    selected={photo.photoId === selectedPhotoId}
                    onClick={() => handleSelectPhoto(photo.photoId)}
                  />
                </CustomOverlay>
              ) : null
            )}
          </BackgroundMap>
        ) : (
          <div className={classes.loading}>지도를 불러오는 중...</div>
        )}
      </div>

      {selectedPhoto && (
        <div className={classes.selectedCard}>
          <SelectedPhotoCard
            thumbnailUrl={selectedPhoto.thumbnailUrl}
            takenAt={selectedPhotoInfo?.takenAt ?? null}
            region={selectedPhotoInfo?.region ?? null}
            onViewPhoto={() => handleViewPhoto(selectedPhoto.photoId)}
          />
        </div>
      )}

      <NavigationBar nowTab="map" />
    </div>
  );
}
