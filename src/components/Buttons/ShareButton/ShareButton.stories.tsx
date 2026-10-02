import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import ShareButton from './ShareButton';

const meta = {
  title: 'Components/ShareButton',
  component: ShareButton,
  args: { onClick: fn() },
} satisfies Meta<typeof ShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
