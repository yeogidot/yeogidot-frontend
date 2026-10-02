import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import BlackBackButton from '@components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import { storyPhoto } from '../storyFixtures';
import FullPhotoLayout from './FullPhotoLayout';

const meta = {
  title: 'Domains/Travel/FullPhotoLayout',
  component: FullPhotoLayout,
  args: { photo: storyPhoto },
} satisfies Meta<typeof FullPhotoLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithOverlay: Story = {
  name: '오버레이 버튼 포함',
  args: {
    children: <BlackBackButton onClick={fn()} />,
  },
};
