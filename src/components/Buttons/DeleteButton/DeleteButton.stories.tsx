import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import DeleteButton from './DeleteButton';

const meta = {
  title: 'Components/DeleteButton',
  component: DeleteButton,
  args: { onClick: fn() },
} satisfies Meta<typeof DeleteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
