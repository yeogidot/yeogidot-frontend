import type { Meta, StoryObj } from '@storybook/react';

import Snackbar from './Snackbar';
import { snackbarManager } from './manager';

const meta = {
  title: 'Components/Snackbar',
  component: Snackbar,
  decorators: [
    Story => (
      <>
        <Story />
        <Snackbar />
      </>
    ),
  ],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Trigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem' }}
    >
      <button
        type="button"
        style={{ padding: '8px 16px', cursor: 'pointer' }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export const Default: Story = {
  name: '기본',
  render: () => (
    <Trigger
      label="스낵바 열기"
      onClick={() => snackbarManager.add({ description: '저장되었습니다.' })}
    />
  ),
};

export const WithAction: Story = {
  name: '액션 버튼',
  render: () => (
    <Trigger
      label="일정 삭제"
      onClick={() => {
        const id = snackbarManager.add({
          description: '일정이 삭제되었습니다.',
          actionProps: {
            children: '취소',
            onClick: () => {
              snackbarManager.close(id);
              snackbarManager.add({ description: '취소되었습니다.' });
            },
          },
        });
      }}
    />
  ),
};

export const LongMessage: Story = {
  name: '긴 메시지',
  render: () => (
    <Trigger
      label="긴 메시지 열기"
      onClick={() =>
        snackbarManager.add({
          description:
            '이미지 용량이 너무 커서 업로드할 수 없습니다. 10MB 이하의 이미지를 선택해 주세요.',
        })
      }
    />
  ),
};

export const Stacked: Story = {
  name: '스택 쌓기',
  render: () => (
    <Trigger
      label="스낵바 3개 쌓기"
      onClick={() => {
        snackbarManager.add({ description: '짧은 알림입니다.' });
        snackbarManager.add({
          description:
            '두 줄 이상으로 늘어나는 긴 알림 메시지입니다. 스택에서 높이가 어덯게 처리되는지 확인할 수 있습니다.',
        });
        snackbarManager.add({ description: '마지막 알림입니다.' });
      }}
    />
  ),
};
