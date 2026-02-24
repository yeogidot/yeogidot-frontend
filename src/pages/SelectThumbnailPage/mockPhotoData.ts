import type { DatedPhotoData } from '../../types/photo.type';

const createMockFile = (fileName: string) =>
  new File(['mock-image-content'], fileName, { type: 'image/jpeg' });

export const mockPhotos: DatedPhotoData[] = [
  // 2023-10-24
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-24',
    file: createMockFile('hotel-pool.jpg'),
    isThumbnail: true,
    warning: false,
    link: 'photo',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1368&auto=format&fit=crop',
    date: '2023-10-24',
    file: createMockFile('beach-walk.jpg'),
    isThumbnail: false,
    warning: true,
    link: 'photo',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-24',
    file: createMockFile('resort-night-view.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },

  // 2023-10-25
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    file: createMockFile('hiking-start.jpg'),
    isThumbnail: false,
    warning: true,
    link: 'photo',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    file: createMockFile('campground-view.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    file: createMockFile('forest-tent.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-25',
    file: createMockFile('evening-bbq.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },

  // 2023-10-26
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-26',
    file: createMockFile('swiss-mountains.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-26',
    file: createMockFile('lake-view.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-26',
    file: createMockFile('train-trip.jpg'),
    isThumbnail: false,
    warning: false,
    link: 'photo',
  },

  // 날짜 없음 (미분류)
  {
    id: 11,
    url: 'https://plus.unsplash.com/premium_photo-1676288635850-cd91d5b2a3af?q=80&w=1287&auto=format&fit=crop',
    date: null,
    file: createMockFile('florence-duomo.jpg'),
    isThumbnail: false,
    warning: true,
    link: 'photo',
  },
];