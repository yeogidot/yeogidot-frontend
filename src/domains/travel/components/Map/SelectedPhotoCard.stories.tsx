import type { Meta, StoryObj } from '@storybook/react';

import { storyPhoto } from '../storyFixtures';
import SelectedPhotoCard from './SelectedPhotoCard';

const meta = {
  title: 'Domains/Travel/SelectedPhotoCard',
  component: SelectedPhotoCard,
  args: {
    thumbnailUrl: storyPhoto.url,
    takenAt: storyPhoto.date,
    region: '부산광역시 해운대구',
    onViewPhoto: () => {},
  },
} satisfies Meta<typeof SelectedPhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMetadata: Story = {
  name: '날짜·지역 정보 없음',
  args: { takenAt: null, region: null },
};

export const LongRegion: Story = {
  name: '긴 지역명',
  args: {
    region: '대한민국 부산광역시 해운대구 우동 해운대해수욕장 근처 어딘가',
  },
};
