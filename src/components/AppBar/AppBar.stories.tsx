import { Link, MemoryRouter } from 'react-router-dom';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import SettingsIcon from '@assets/icons/settings.svg?react';

import AppBar from './AppBar';
import classes from './AppBar.module.css';

const withRouter: Decorator = Story => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Components/AppBar',
  component: AppBar,
  decorators: [withRouter],
  args: { title: '내 여행 목록' },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackButton: Story = {
  name: '뒤로가기 버튼',
  args: {
    title: '여행 편집',
    onBack: () => {},
  },
};

export const WithSettingsAction: Story = {
  name: '설정 버튼',
  args: {
    rightAction: (
      <Link
        to="/setting"
        state={{ forward: true }}
        viewTransition
        aria-label="설정"
        className={classes.actionLink}
      >
        <SettingsIcon className={classes.actionIcon} aria-hidden="true" />
      </Link>
    ),
  },
};
