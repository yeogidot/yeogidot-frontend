import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import DeleteConfirmModal from './DeleteConfirmModal';

const meta = {
  title: 'Components/DeleteConfirmModal',
  component: DeleteConfirmModal,
  args: {
    message: '이 여행을 삭제하시겠습니까?\n삭제된 여행은 복구할 수 없습니다.',
    onCancel: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof DeleteConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
