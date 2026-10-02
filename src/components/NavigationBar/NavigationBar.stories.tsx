import { MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';

import NavigationBar from './NavigationBar';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  decorators: [withRouter],
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MapTab: Story = {
  name: '지도 탭',
  args: { nowTab: 'map' },
};

export const MyTravelTab: Story = {
  name: '내 여행 탭',
  args: { nowTab: 'my-travel' },
};
