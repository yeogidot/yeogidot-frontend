import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import AppLaunchBanner from './AppLaunchBanner';

const meta = {
  title: 'Components/AppLaunchBanner',
  component: AppLaunchBanner,
  args: { onAppLaunch: fn() },
} satisfies Meta<typeof AppLaunchBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
