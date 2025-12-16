import type { Photo } from './photo';

export type DayTravel = {
  title: string; // 여행제목
  city: string; // 여행한 도시
  period: string; // 여행 기간 (예: "2025-10-16 ~ 2025-10-18")
  diary: string | null; // 여행일기 (없을 수 있음)
  photos: Photo[]; // photo 리스트
};

