import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { FullTravel, NewTravelInfo } from 'src/types/travel.type';
import { mockTravel } from './mockTravel';

const mockTravelData: FullTravel = mockTravel;

export default function EditTravelPage() {
  const [travelData, setTravelData] = useState<NewTravelInfo>({
    title: mockTravelData.title,
    photos: mockTravelData.days
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
        };
      }),
    thumbnailPhotoId: mockTravelData.representativePhotoId,
  });
  return <Outlet context={[travelData, setTravelData]} />;
}
