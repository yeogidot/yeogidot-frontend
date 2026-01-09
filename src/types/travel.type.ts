import type { FullPhotoData } from './photo.type';

export interface NewTravelInfo {
  title: string;
  photos: FullPhotoData[];
  thumbnailPhotoId: number;
}
export interface TravelInfo extends NewTravelInfo {
  id: number;
  thumbnail: string;
  startDate: string;
  endDate: string;
  location: string;
}
