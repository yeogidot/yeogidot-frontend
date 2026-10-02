import { samplePhotos } from 'src/data/samplePhotos';
import type { DatedPhotoData } from '../types/photo.type';

const toDatedPhoto = (
  photo: (typeof samplePhotos)[number],
  index: number
): DatedPhotoData => ({
  id: index + 1,
  url: photo.url,
  file: new File([], `sample-photo-${index + 1}.jpg`, { type: 'image/jpeg' }),
  date: photo.timestamp.toISOString(),
  warning: false,
  isThumbnail: false,
  link: `/travel/1/photos/${index + 1}`,
});

export const storyPhotos: DatedPhotoData[] = samplePhotos.map(toDatedPhoto);

export const storyPhoto: DatedPhotoData = {
  ...storyPhotos[0],
  isThumbnail: true,
};
