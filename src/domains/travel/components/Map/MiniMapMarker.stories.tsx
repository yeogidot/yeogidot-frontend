import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { storyPhoto } from '../storyFixtures';
import MiniMapMarker from './MiniMapMarker';

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
  title: 'Domains/Travel/MiniMapMarker',
  component: MiniMapMarker,
  decorators: [withCenteredLayout],
  args: {
    photoUrl: storyPhoto.url,
    label: '해운대',
    onClick: () => {},
  },
} satisfies Meta<typeof MiniMapMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabel: Story = {
  name: '긴 지역명',
  args: {
    label: '제주특별자치도 서귀포시',
  },
};
