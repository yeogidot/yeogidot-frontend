import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import FileSelectButton from './FileSelectButton';

const meta = {
  title: 'Components/FileSelectButton',
  component: FileSelectButton,
  args: {
    children: '사진 추가',
    accept: 'image/*',
    multiple: true,
    onChange: fn(),
  },
} satisfies Meta<typeof FileSelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleImageOnly: Story = {
  name: '단일 이미지 선택',
  args: {
    multiple: false,
    children: '사진 한 장 선택',
  },
};
