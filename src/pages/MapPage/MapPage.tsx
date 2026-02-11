import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundMap from '../../components/Map/Map';
import PhotoMarker from '../../components/Map/PhotoMarker';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import BackButton from '../../components/Buttons/BackButton/GrayBackButton/GrayBackButton';
import { photoService } from '../../apis/services/photo';
import type { FullPhoto } from '../../types/photo.type';
import classes from './MapPage.module.css';

// Default center (Seoul or user's default)
const DEFAULT_CENTER: [number, number] = [37.5665, 126.9780];

export default function MapPage() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState<Partial<FullPhoto>[]>([]);
    const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // TODO: Replace with actual token management
                const token = localStorage.getItem('accessToken') || '';
                const response = await photoService.getPhotosForMarker(token);

                if (response.data) {
                    const validPhotos = response.data.filter(
                        (photo) => photo.latitude && photo.longitude
                    );

                    // Sort photos by date (latest first)
                    validPhotos.sort((a, b) => {
                        const dateA = new Date(a.takenAt || a.createdDate || 0).getTime();
                        const dateB = new Date(b.takenAt || b.createdDate || 0).getTime();
                        return dateB - dateA;
                    });

                    setPhotos(validPhotos);

                    // If there are photos, center the map on the latest one (first in sorted list)
                    if (validPhotos.length > 0 && validPhotos[0].latitude && validPhotos[0].longitude) {
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

    return (
        <div className={classes.container}>
            <div className={classes.backButton}>
                <BackButton onClick={handleBackClick} />
            </div>

            <BackgroundMap className={classes.map} position={mapCenter}>
                {photos.map((photo) => (
                    photo.latitude && photo.longitude && photo.url ? (
                        <PhotoMarker
                            key={photo.id}
                            position={[photo.latitude, photo.longitude]}
                            photoUrl={photo.url}
                        />
                    ) : null
                ))}
            </BackgroundMap>

            <NavigationBar nowTab="map" />
        </div>
    );
}
