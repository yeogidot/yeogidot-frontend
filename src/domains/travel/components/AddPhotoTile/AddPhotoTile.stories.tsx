import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import AddPhotoTile from './AddPhotoTile';

/* PhotoGrid 셀(시안 기준 112.67px)과 동일한 크기에서 확인하기 위한 래퍼 */
const inGridCell: Decorator = Story => (
  <div style={{ width: 112.67 }}>
    <Story />
  </div>
);

const meta = {
  title: 'Domains/Travel/AddPhotoTile',
  component: AddPhotoTile,
  decorators: [inGridCell],
} satisfies Meta<typeof AddPhotoTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
  args: { onChange: fn() },
};

export const JpegOnlyMultiple: Story = {
  name: 'JPG 파일만 선택 (복수 선택)',
  args: { accept: 'image/jpeg', multiple: true, onChange: fn() },
};
