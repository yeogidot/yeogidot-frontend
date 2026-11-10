import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { storyPhotos } from '../storyFixtures';
import PhotoGrid from './PhotoGrid';
import AddPhotoTile from '../AddPhotoTile/AddPhotoTile';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Domains/Travel/PhotoGrid',
  component: PhotoGrid,
  decorators: [withRouter],
  args: { photos: storyPhotos },
} satisfies Meta<typeof PhotoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithUploadTile: Story = {
  name: '업로드 타일 포함',
  args: { photos: storyPhotos, uploadTile: <AddPhotoTile onChange={fn()} /> },
};
