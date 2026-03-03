import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { NewTravelInfo } from 'src/types/travel.type';

export default function NewTravelPage() {
  const [travel, setTravel] = useState<NewTravelInfo>({
    title: '',
    photos: [],
    thumbnailPhotoId: null,
  });
  return <Outlet context={{ travel, setTravel }} />;
}
