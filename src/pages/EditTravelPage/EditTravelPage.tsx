import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { NewTravelInfo, FullTravel } from 'src/types/travel.type';
import { travelService } from 'src/apis/services/travel';

import { useApi } from '@hooks/api';
const convertTravelToTravelInfo = (travel: FullTravel) => {
  return {
    title: travel.title,
    photos: travel.days
      .map(({ photos }) => {
        return photos;
      })
      .flat()
      .map(({ photoId, takenAt, longitude, latitude, url }) => {
        return {
          id: photoId as number,
          date: takenAt ?? null,
          GPSCoordinates:
            latitude && longitude
              ? {
                  longitude: longitude,
                  latitude: latitude,
                }
              : null,
          url: url as string,
          link: 'photo',
          file: new File([], ''),
        };
      }),
    thumbnailPhotoId: travel.representativePhotoId,
  };
};
export default function EditTravelPage() {
  const { state } = useLocation();
  const token = localStorage.getItem('accessToken');
  const [travel, setTravel] = useState<NewTravelInfo>();
  const { data, error, request, loading } = useApi(travelService.getTravel);

  useEffect(() => {
    if (token && !data) {
      request(state.travel.travelId, token);
    }
  }, [token, request, data, state]);

  useEffect(() => {
    if (error) {
      alert(error);
      return;
    }
    if (data && !travel) {
      setTravel(convertTravelToTravelInfo(data));
    }
  }, [data, error, travel, convertTravelToTravelInfo]);
  return <Outlet context={{ travel, setTravel, loading, error }} />;
}
