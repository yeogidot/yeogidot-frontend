import { useCallback, useState } from 'react';
import Modal from '@components/Modal/Modal';

type OpenModalOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'blue' | 'gray' | 'red';
  cancelVariant?: 'blue' | 'gray' | 'red';
  onConfirm?: () => void;
  onCancel?: () => void;
};

type InitialModalOptions = OpenModalOptions & {
  isOpen?: boolean;
};

type ModalState = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmVariant?: 'blue' | 'gray' | 'red';
  cancelVariant?: 'blue' | 'gray' | 'red';
  onConfirm?: () => void;
  onCancel?: () => void;
};

const initialState: ModalState = {
  isOpen: false,
  title: '확인',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
};

export default function useModal(initialOptions?: InitialModalOptions) {
  const [state, setState] = useState<ModalState>(() => {
    if (!initialOptions) return initialState;

    return {
      isOpen: initialOptions.isOpen ?? true,
      title: initialOptions.title ?? '확인',
      message: initialOptions.message,
      confirmText: initialOptions.confirmText ?? '확인',
      cancelText: initialOptions.cancelText ?? '취소',
      onConfirm: initialOptions.onConfirm,
      onCancel: initialOptions.onCancel,
      confirmVariant: initialOptions.confirmVariant ?? 'blue',
      cancelVariant: initialOptions.cancelVariant ?? 'gray',
    };
  });

  const closeModal = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const openModal = useCallback((options: OpenModalOptions) => {
    setState({
      isOpen: true,
      title: options.title ?? '확인',
      message: options.message,
      confirmText: options.confirmText ?? '확인',
      cancelText: options.cancelText ?? '취소',
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      cancelVariant: options.cancelVariant ?? 'gray',
      confirmVariant: options.confirmVariant ?? 'blue',
    });
  }, []);

  const handleConfirm = () => {
    state.onConfirm?.();
    closeModal();
  };

  const handleCancel = () => {
    state.onCancel?.();
    closeModal();
  };

  const modalElement = (
    <Modal.Root isOpen={state.isOpen} onCancel={handleCancel}>
      <Modal.Title>{state.title}</Modal.Title>
      <p>{state.message}</p>
      <Modal.ButtonGroup>
        <Modal.Button variant={state.cancelVariant} onClick={handleCancel}>
          {state.cancelText}
        </Modal.Button>
        <Modal.Button variant={state.confirmVariant} onClick={handleConfirm}>
          {state.confirmText}
        </Modal.Button>
      </Modal.ButtonGroup>
    </Modal.Root>
  );

  return { openModal, closeModal, modalElement };
}
