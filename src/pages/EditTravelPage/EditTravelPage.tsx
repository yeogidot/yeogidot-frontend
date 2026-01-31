import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { FullTravel, NewTravelInfo } from 'src/types/travel.type';

const mockTravelData: FullTravel = {
  travelId: 7,
  title: '수정된 여행 제목',
  trvRegion: '서울특별시',
  representativePhotoId: 22,
  shareUrl: null,
  startDate: '2026-01-29',
  endDate: '2026-01-29',
  days: [
    {
      dayId: 7,
      dayNumber: 1,
      date: '2026-01-29',
      dayRegion: '중구',
      photos: [
        {
          photoId: 22,
          url: 'https://storage.googleapis.com/yeogidot-storage/ed3f9598-b468-4df9-a82a-ba365049acc5.jpg',
          takenAt: '2026-01-29T12:00:00',
          latitude: 37.5665,
          longitude: 126.978,
          comments: [],
        },
      ],
      diary: null,
    },
  ],
};

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
