import type { NewTravelInfo } from 'src/types/travel.type';

interface TravelContextType {
  travel: NewTravelInfo;
  setTravel: React.Dispatch<React.SetStateAction<NewTravelInfo>>;
}

interface EditTravelContextType extends TravelContextType {
  loading: boolean;
  error: string | null;
  status: number | null;
  message: string | undefined;
}

import { useOutletContext } from 'react-router-dom';
export function useTravel() {
  return useOutletContext<TravelContextType>();
}

export function useEditTravel() {
  return useOutletContext<EditTravelContextType>();
}
