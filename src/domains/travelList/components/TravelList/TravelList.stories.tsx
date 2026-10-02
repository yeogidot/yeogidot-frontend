import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { samplePhotos } from 'src/data/samplePhotos';
import type { TravelInfo } from 'src/domains/travel/types/travel.type';
import TravelList from './TravelList';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const titles = ['부산 여행', '서울 여행', '강릉 여행'];
const regions = ['부산광역시', '서울특별시', '강원도 강릉시'];

const storyTravels: TravelInfo[] = samplePhotos.map((photo, index) => ({
  travelId: index + 1,
  title: titles[index],
  representativeImageUrl: photo.url,
  startDate: '2025-01-02',
  endDate: '2025-01-03',
  trvRegion: regions[index],
}));

const meta = {
  title: 'Domains/TravelList/TravelList',
  component: TravelList,
  decorators: [withRouter],
  args: { travels: storyTravels },
} satisfies Meta<typeof TravelList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  name: '빈 목록',
  args: { travels: [] },
};
