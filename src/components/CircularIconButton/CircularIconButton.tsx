import type { ButtonHTMLAttributes } from 'react';
import classes from './CircularIconButton.module.css';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

export default function CircularIconButton({
  icon,
  onClick,
  className,
}: Props) {
  return (
    <button
      type="button"
      className={`${classes.grayIconWrapper} ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt="버튼 아이콘" className={classes.icon} />
    </button>
  );
}
