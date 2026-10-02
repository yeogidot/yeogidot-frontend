import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { storyPhotos } from '../storyFixtures';
import DatePhotoGrid from './DatePhotoGrid';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Domains/Travel/DatePhotoGrid',
  component: DatePhotoGrid,
  decorators: [withRouter],
  args: { photos: storyPhotos },
} satisfies Meta<typeof DatePhotoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMissingDate: Story = {
  name: '날짜 없는 사진 포함',
  args: {
    photos: [...storyPhotos, { ...storyPhotos[0], id: 'no-date', date: null }],
  },
};
