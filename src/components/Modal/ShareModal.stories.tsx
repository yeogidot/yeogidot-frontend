import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import ShareModal from './ShareModal';

const meta = {
  title: 'Components/ShareModal',
  component: ShareModal,
  args: {
    shareUrl: 'https://yeogidot.example.com/travel/1',
    onCancel: fn(),
  },
} satisfies Meta<typeof ShareModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
