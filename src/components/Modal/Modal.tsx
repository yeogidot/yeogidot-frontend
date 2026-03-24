import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Button from '@components/Buttons/Button/Button';
import classes from './Modal.module.css';
interface Props {
  isOpen: boolean;
  onCancel: () => void;
  children?: ReactNode;
}

export function Modal({ children }: { children: ReactNode }) {
  return children;
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h2 id="modal-title" className={classes.modalTitle}>
      {children}
    </h2>
  );
}

function ButtonGroup({ children }: { children: ReactNode }) {
  return <div className={classes.modalButtonGroup}>{children}</div>;
}

function ModalButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button {...props} className={`${classes.modalButton} ${className ?? ''}`}>
      {children}
    </Button>
  );
}

function Root({ isOpen, onCancel, children }: Props) {
  const handleOuterClick = () => {
    onCancel();
  };
  return isOpen ? (
    <div
      className={classes.modalOverlay}
      role="presentation"
      onClick={handleOuterClick}
    >
      <div
        className={classes.modal}
        role="dialog"
        aria-labelledby="modal-title"
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : (
    ''
  );
}
Modal.Root = Root;
Modal.ButtonGroup = ButtonGroup;
Modal.Button = ModalButton;
Modal.Title = Title;
export default Modal;
