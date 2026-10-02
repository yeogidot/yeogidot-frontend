import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import BackButton from './GrayBackButton';

const meta = {
  title: 'Components/GrayBackButton',
  component: BackButton,
  args: { onClick: fn() },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
