import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import Button from '@components/Buttons/Button/Button';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal.Root,
  args: {
    isOpen: true,
    onCancel: fn(),
  },
  render: args => (
    <Modal.Root isOpen={args.isOpen} onCancel={args.onCancel}>
      <Modal.Title>여행 삭제</Modal.Title>
      <p>정말로 이 여행을 삭제하시겠습니까?</p>
      <Modal.ButtonGroup>
        <Modal.Button variant="gray" onClick={args.onCancel}>
          취소
        </Modal.Button>
        <Modal.Button variant="red" onClick={args.onCancel}>
          삭제
        </Modal.Button>
      </Modal.ButtonGroup>
    </Modal.Root>
  ),
} satisfies Meta<typeof Modal.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmDelete: Story = {
  name: '삭제 확인',
};

export const Notice: Story = {
  name: '안내',
  render: args => (
    <Modal.Root isOpen={args.isOpen} onCancel={args.onCancel}>
      <Modal.Title>안내</Modal.Title>
      <p>저장이 완료되었습니다.</p>
      <Modal.ButtonGroup>
        <Modal.Button variant="blue" onClick={args.onCancel}>
          확인
        </Modal.Button>
      </Modal.ButtonGroup>
    </Modal.Root>
  ),
};

function InteractiveModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ padding: '1rem' }}>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal.Root isOpen={isOpen} onCancel={() => setIsOpen(false)}>
        <Modal.Title>여행 삭제</Modal.Title>
        <p>정말로 이 여행을 삭제하시겠습니까?</p>
        <Modal.ButtonGroup>
          <Modal.Button variant="gray" onClick={() => setIsOpen(false)}>
            취소
          </Modal.Button>
          <Modal.Button variant="red" onClick={() => setIsOpen(false)}>
            삭제
          </Modal.Button>
        </Modal.ButtonGroup>
      </Modal.Root>
    </div>
  );
}

export const Interactive: Story = {
  name: '열고 닫기',
  render: () => <InteractiveModalDemo />,
};
