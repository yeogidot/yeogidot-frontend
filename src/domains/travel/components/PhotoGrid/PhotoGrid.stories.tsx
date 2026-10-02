import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { storyPhotos } from '../storyFixtures';
import PhotoGrid from './PhotoGrid';

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
