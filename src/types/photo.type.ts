export interface PhotoData {
  id: number;
  url: string;
  file: File;
  warning?: boolean;
  isThumbnail?: boolean;
  link?: string;
}
export interface DatedPhotoData extends PhotoData {
  date: string | null;
}

export interface FullPhotoData extends DatedPhotoData {
  GPSCoordinates: { latitude: number; longitude: number } | null;
}

export interface Photo {
  id: number;
  url: string;
  createdDate?: string;
  modifiedDate?: string;
}
export interface PhotoMetadata {
  originalName: string;
  takenAt: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface DatedPhoto extends Photo {
  takenAt: string | null;
}

export type FullPhoto = Photo & PhotoMetadata;
