import type { Photo } from '../domains/travel/types/simplePhoto';
import SamplePhoto1 from '../assets/images/samplePhoto1.jpg';
import SamplePhoto2 from '../assets/images/samplePhoto2.jpg';
import SamplePhoto3 from '../assets/images/samplePhoto3.jpg';

// 지도 중심 좌표 [35.1796, 129.0756] 근처의 부산 지역 좌표들 (OSM 형식: [위도, 경도])
const locations: [number, number][] = [
  [35.1578, 129.1125], // 남서쪽
  [35.1612, 129.1158], // 북동쪽
  [35.16, 129.1109], // 북서쪽
];

export const samplePhotos: Photo[] = [
  {
    url: SamplePhoto1,
    location: locations[0],
    timestamp: new Date('2025-01-02T14:30:00'),
  },
  {
    url: SamplePhoto2,
    location: locations[1],
    timestamp: new Date('2025-01-02T16:10:00'),
  },
  {
    url: SamplePhoto3,
    location: locations[2],
    timestamp: new Date('2025-01-03T09:45:00'),
  },
];
