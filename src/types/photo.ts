export type Photo = {
  url: string;
  location: [number, number]; // [위도, 경도]
  timestamp: Date;
};