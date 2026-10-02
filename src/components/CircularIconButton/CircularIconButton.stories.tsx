import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import editIcon from '@assets/icons/edit.svg';
import CircularIconButton from './CircularIconButton';

const meta = {
  title: 'Components/CircularIconButton',
  component: CircularIconButton,
  args: {
    icon: editIcon,
    onClick: fn(),
  },
} satisfies Meta<typeof CircularIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
