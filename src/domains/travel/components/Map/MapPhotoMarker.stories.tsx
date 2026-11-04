import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { storyPhoto } from '../storyFixtures';
import MapPhotoMarker from './MapPhotoMarker';

const withCenteredLayout: Decorator = Story => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
    }}
  >
    <Story />
  </div>
);

const meta = {
  title: 'Domains/Travel/MapPhotoMarker',
  component: MapPhotoMarker,
  decorators: [withCenteredLayout],
  args: {
    photoUrl: storyPhoto.url,
    selected: false,
    onClick: () => {},
  },
} satisfies Meta<typeof MapPhotoMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  name: '선택됨',
  args: { selected: true },
};
