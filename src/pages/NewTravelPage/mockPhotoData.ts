import type { DatedPhotoData } from '../../types/photo.type';

export const mockPhotos: DatedPhotoData[] = [
  // 2023-10-24
  {
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-24',
    size: 2400000,
    name: '호텔 수영장',
  },
  {
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1368&auto=format&fit=crop',
    date: '2023-10-24',
    size: 1800000,
    name: '해변 산책',
  },
  {
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-24',
    size: 3200000,
    name: '리조트 야경',
  },

  // 2023-10-25
  {
    url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    size: 1500000,
    name: '하이킹 시작',
  },
  {
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    size: 2100000,
    name: '캠핑장 전경',
  },
  {
    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    size: 1900000,
    name: '숲속 텐트',
  },
  {
    url: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    size: 2200000,
    name: '저녁 바비큐',
  },

  // 2023-10-26
  {
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-26',
    size: 4500000,
    name: '스위스 산맥',
  },
  {
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-26',
    size: 2800000,
    name: '호수 풍경',
  },
  {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-26',
    size: 3100000,
    name: '기차 여행',
  },

  // 날짜 없음 (미분류)
  {
    url: 'https://plus.unsplash.com/premium_photo-1676288635850-cd91d5b2a3af?q=80&w=1287&auto=format&fit=crop',
    date: null,
    size: 1200000,
    name: '피렌체 두오모',
  },
];
