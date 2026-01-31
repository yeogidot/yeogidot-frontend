import type { FullPhotoData, FullPhoto } from './photo.type';

export interface NewTravelInfo {
  title: string;
  photos: FullPhotoData[];
  thumbnailPhotoId: number | null;
}
export interface TravelInfo extends NewTravelInfo {
  id: number;
  thumbnail: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface TravelDay {
  dayId: number;
  dayNumber: number;
  date: string;
  dayRegion: string;
  photos: Partial<FullPhoto>[];
  diary: {
    logId: number;
    content: string;
    logCreated: string;
  } | null;
}

export interface FullTravel {
  travelId: number;
  title: string;
  representativePhotoId: number;
  trvRegion: string;
  shareUrl: string | null;
  startDate: string;
  endDate: string;
  days: TravelDay[];
}

export interface SharedTravelUrl {
  status: number;
  message: string;
  data: {
    travelId: number;
    shareUrl: string;
  }[];
}
