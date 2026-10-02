import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { samplePhotos } from 'src/data/samplePhotos';
import type { TravelInfo } from 'src/domains/travel/types/travel.type';
import TravelItem from './TravelItem';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const storyTravel: TravelInfo = {
  travelId: 1,
  title: '부산 여행',
  representativeImageUrl: samplePhotos[0].url,
  startDate: '2025-01-02',
  endDate: '2025-01-03',
  trvRegion: '부산광역시 중구',
};

const meta = {
  title: 'Domains/TravelList/TravelItem',
  component: TravelItem,
  decorators: [withRouter],
  args: { travel: storyTravel },
} satisfies Meta<typeof TravelItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MissingThumbnail: Story = {
  name: '대표 이미지 없음',
  args: {
    travel: { ...storyTravel, representativeImageUrl: '/missing.jpg' },
  },
};
