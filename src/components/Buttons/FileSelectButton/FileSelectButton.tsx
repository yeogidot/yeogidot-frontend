import type { InputHTMLAttributes } from 'react';
import classes from './FileSelectButton.module.css';
interface Props extends InputHTMLAttributes<HTMLInputElement> {}
export default function FileSelectButton({
  onChange,
  children,
  id = 'select-photo',
  accept = '',
  multiple = true,
  className = '',
  ...props
}: Props) {
  return (
    <span
      className={`${classes.container} ${className}`}
      aria-label="사진 업로드 버튼"
    >
      <label htmlFor={id}>{children}</label>
      <input
        type="file"
        accept={accept}
        id={id}
        multiple={multiple}
        onChange={onChange}
        className={classes.fileInput}
        {...props}
      />
    </span>
  );
}
