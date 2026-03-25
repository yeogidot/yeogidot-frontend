import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundMap from '../../components/Map/Map';
import PhotoMarker from '../../components/Map/PhotoMarker';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton';
import { photoService } from '../../apis/services/photo';
import type { PhotoMarkerData } from '../../types/photo.type';
import classes from './MapPage.module.css';

// Default center (Seoul or user's default)
const DEFAULT_CENTER: [number, number] = [37.5665, 126.978];

export default function MapPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoMarkerData[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);

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
            setMapCenter([validPhotos[0].latitude, validPhotos[0].longitude]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch photos for map:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handleBackClick = () => {
    navigate('/my-travel');
  };

  const handleMarkerClick = async (photoId: number) => {
    try {
      const token = localStorage.getItem('accessToken') || '';
      
      // We must find the travelId that contains this photoId
      // because the photo object doesn't have travelId and TravelPhotoComment requires it.
      const travelsRes = await import('../../apis/services/travel').then(m => m.travelService.getTravels(token));
      if (!travelsRes.data) return;

      for (const travel of travelsRes.data) {
        const detailRes = await import('../../apis/services/travel').then(m => m.travelService.getTravel(travel.travelId, token));
        if (detailRes.data) {
          const allPhotos = detailRes.data.days.flatMap(day => day.photos);
          if (allPhotos.find(p => p.photoId === photoId)) {
            navigate(`/travel/${travel.travelId}/photos/${photoId}/travel-photo-comment`);
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
      <div className={classes.backButton}>
        <BackButton onClick={handleBackClick} />
      </div>

            <BackgroundMap className={classes.map} position={mapCenter}>
                {photos.map(photo =>
                    photo.latitude && photo.longitude ? (
                        <PhotoMarker
                            key={photo.photoId}
                            position={[photo.latitude, photo.longitude]}
                            photoUrl={photo.thumbnailUrl}
                            onClick={() => photo.photoId && handleMarkerClick(photo.photoId)}
                        />
                    ) : null
                )}
            </BackgroundMap>

      <NavigationBar nowTab="map" />
    </div>
  );
}
