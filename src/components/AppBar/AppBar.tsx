import type { ReactNode } from 'react';
import classes from './AppBar.module.css';
import ArrowBackIcon from '@assets/icons/arrow-back.svg?react';

interface Props {
  title: string;
  onBack?: () => void;
  rightAction?: ReactNode;
}

export default function AppBar({ title, onBack, rightAction }: Props) {
  return (
    <header className={classes.header}>
      <div className={classes.leftGroup}>
        {onBack && (
          <button
            type="button"
            className={classes.backButton}
            onClick={onBack}
            aria-label="뒤로가기"
          >
            <ArrowBackIcon className={classes.backIcon} aria-hidden="true" />
          </button>
        )}
        <h1 className={classes.title}>{title}</h1>
      </div>
      {rightAction}
    </header>
  );
}
