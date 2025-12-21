import type { DayTravel } from '../types/dayTravel';
import { samplePhotos } from './samplePhotos';

// 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// 사진들에서 여행 기간 계산 (첫 번째 사진 ~ 마지막 사진 날짜)
const calculateTravelPeriod = (photos: typeof samplePhotos): string => {
  if (photos.length === 0) return '';

  const sortedPhotos = [...photos].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  const startDate = sortedPhotos[0].timestamp;
  const endDate = sortedPhotos[sortedPhotos.length - 1].timestamp;

  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);

  return `${startDateStr} ~ ${endDateStr}`;
};

// 샘플 여행 데이터
export const sampleTravelData: DayTravel = {
  title: '부산 여행',
  city: '부산광역시',
  period: calculateTravelPeriod(samplePhotos),
  diary: '많이 걸어서 힘들었지만 재미있었음',
  photos: samplePhotos,
};

// 여러 일차 여행 데이터 (필요시 확장)
export const sampleDayTravels = [
  {
    day: 1,
    title: '1일차 여행일기',
    locations: '부산광역시 부산진구, 수영구',
    diary: '많이 걸어서 힘들었지만 재미있었음',
    photos: samplePhotos.slice(0, 3), // 1일차는 처음 3장 사진
  },
];
