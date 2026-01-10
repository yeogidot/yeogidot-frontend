import { Outlet, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import type { NewTravelInfo } from 'src/types/travel.type';

export default function NewTravelPage() {
  const [travelData, setTravelData] = useState<NewTravelInfo>({
    title: '',
    photos: [],
    thumbnailPhotoId: null,
  });
  return <Outlet context={[travelData, setTravelData]} />;
}
