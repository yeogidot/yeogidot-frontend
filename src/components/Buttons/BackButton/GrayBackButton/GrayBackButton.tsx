import classes from './GrayBackButton.module.css';
import backIcon from '../../../../assets/icons/back-white.svg';
import type { ButtonHTMLAttributes } from 'react';

type BackButtonProps = {
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <button
      type="button"
      className={`${classes.grayIconWrapper} ${classes.mapBackButton} ${className}`}
      onClick={onClick}
    >
      <img src={backIcon} alt="Back" className={classes.icon} />
    </button>
  );
}
