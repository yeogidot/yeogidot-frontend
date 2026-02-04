import type { NewTravelInfo } from 'src/types/travel.type';

type TravelContextType = [
  travelData: NewTravelInfo,
  setTravelData: React.Dispatch<React.SetStateAction<NewTravelInfo>>,
];

import { useOutletContext } from 'react-router-dom';
export function useTravel() {
  return useOutletContext<TravelContextType>();
}
