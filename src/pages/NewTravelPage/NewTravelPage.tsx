import { Outlet, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import type { NewTravelInfo } from 'src/types/travel.type';

type ContextType = [
  travelData: NewTravelInfo,
  setTravelData: React.Dispatch<React.SetStateAction<NewTravelInfo>>,
];

export default function NewTravelPage() {
  const [travelData, setTravelData] = useState<NewTravelInfo>({
    title: '',
    photos: [],
    thumbnailPhotoId: null,
  });
  return <Outlet context={[travelData, setTravelData] satisfies ContextType} />;
}

export function useTravel() {
  return useOutletContext<ContextType>();
}
