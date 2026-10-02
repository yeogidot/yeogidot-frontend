import type { Meta, StoryObj } from '@storybook/react';

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
