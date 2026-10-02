import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import EditButton from './EditButton';

const meta = {
  title: 'Components/EditButton',
  component: EditButton,
  args: { onClick: fn() },
} satisfies Meta<typeof EditButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
