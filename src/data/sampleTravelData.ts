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
  {
    day: 2,
    title: '2일차 여행일기',
    locations: '부산광역시 해운대구',
    diary: '바다를 보며 힐링했어요',
    photos: [], // 2일차는 아직 사진 없음
  },
];

// 여행일기 작성 샘플 데이터
export const sampleDiaryEntries = [
  {
    travelId: '1',
    day: 1,
    existingDiary: '많이 걸어서 힘들었지만 재미있었음',
    placeholder: '여기에 내용을 입력해주세요!',
  },
  {
    travelId: '1',
    day: 2,
    existingDiary: null,
    placeholder: '여기에 내용을 입력해주세요!',
  },
];

// 사진 코멘트 작성 샘플 데이터
export const samplePhotoComments = [
  {
    travelId: '1',
    day: 1,
    photoId: '1',
    photo: samplePhotos[0],
    existingComment: '부산항대교에서 찍은 사진이에요',
    placeholder: '여기에 내용을 입력해주세요!',
  },
  {
    travelId: '1',
    day: 1,
    photoId: '2',
    photo: samplePhotos[1],
    existingComment: null,
    placeholder: '여기에 내용을 입력해주세요!',
  },
  {
    travelId: '1',
    day: 1,
    photoId: '3',
    photo: samplePhotos[2],
    existingComment: '맛있는 음식 사진!',
    placeholder: '여기에 내용을 입력해주세요!',
  },
];
