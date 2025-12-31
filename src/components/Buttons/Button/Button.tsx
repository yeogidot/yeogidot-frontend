import type { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';
export default function Button({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${classes.button} ${className}`}
      type="button"
      {...props}
    />
  );
}
