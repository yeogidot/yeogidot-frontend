import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import DatetimeModal from './DatetimeModal';

const meta = {
  title: 'Components/DatetimeModal',
  component: DatetimeModal,
  args: {
    currentDate: null,
    onCancel: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof DatetimeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCurrentDate: Story = {
  name: '기존 촬영 날짜 있음',
  args: { currentDate: '2025-01-02T14:30' },
};
