import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { storyPhoto } from '../storyFixtures';
import Photo from './Photo';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Domains/Travel/Photo',
  component: Photo,
  decorators: [withRouter],
  args: { photo: storyPhoto },
} satisfies Meta<typeof Photo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithWarning: Story = {
  name: '경고 표시',
  args: { photo: { ...storyPhoto, warning: true } },
};

export const Thumbnail: Story = {
  name: '대표 사진',
  args: { photo: { ...storyPhoto, isThumbnail: true } },
};
