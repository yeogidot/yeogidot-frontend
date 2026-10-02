import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import WebViewImageSelectButton from './WebViewImageSelectButton';

const meta = {
  title: 'Components/WebViewImageSelectButton',
  component: WebViewImageSelectButton,
  args: {
    children: '이미지 선택',
    onClick: fn(),
  },
} satisfies Meta<typeof WebViewImageSelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSelection: Story = {
  name: '단일 선택 모드',
  args: {
    allowMultiple: false,
    children: '이미지 하나 선택',
  },
};
