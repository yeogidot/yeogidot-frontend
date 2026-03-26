export interface PhotoData {
  id: string | number;
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

export interface uploadedPhoto {
  id: number;
  url: string;
  createdDate?: string;
  modifiedDate?: string;
  comments: Comment[];
}

export interface Photo {
  photoId: number;
  url: string;
  createdDate?: string;
  modifiedDate?: string;
  comments: Comment[];
  region: string;
}

export interface PhotoGeoData {
  latitude: number | null;
  longitude: number | null;
}
export interface PhotoMarkerData extends PhotoGeoData {
  photoId: number;
  thumbnailUrl: string;
}
export interface PhotoMetadata extends PhotoGeoData {
  originalName: string;
  takenAt: string | null;
}

export interface DatedPhoto extends Photo {
  takenAt: string | null;
}

export type FullPhoto = Photo & PhotoMetadata;

export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
}

export type UploadedFullPhoto = uploadedPhoto & PhotoMetadata;
