export interface PhotoData {
  url: string;
  size: number;
  name: string;
  warning?: boolean;
  link?: string;
}
export interface DatedPhotoData extends PhotoData {
  date: string | null;
}

export interface FullPhotoData extends DatedPhotoData {
  GPSCoordinates: { latitude: number; longitude: number } | null;
}
