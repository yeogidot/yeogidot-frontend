import type { ChangeEventHandler } from 'react';
import { useId } from 'react';
import classes from './AddPhotoTile.module.css';
import ImageIcon from '@assets/icons/image.svg?react';
import WebViewImageSelectButton from '@components/Buttons/WebViewImageSelectButton/WebViewImageSelectButton';
import { isReactNativeWebView } from '@utils/webview';

interface Props {
  className?: string | undefined;
  accept?: string | undefined;
  multiple?: boolean | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

function TileContent() {
  return (
    <>
      <span className={classes.iconCircle}>
        <ImageIcon className={classes.icon} aria-hidden="true" />
      </span>
      <span className={classes.tileLabel}>사진 추가</span>
    </>
  );
}

export default function AddPhotoTile({
  className = '',
  accept = '',
  multiple = true,
  onChange,
}: Props) {
  const inputId = useId();

  if (isReactNativeWebView()) {
    return (
      <WebViewImageSelectButton
        allowMultiple={multiple}
        className={`${classes.tileButton} ${className}`.trim()}
      >
        <TileContent />
      </WebViewImageSelectButton>
    );
  }

  return (
    <>
      <label
        htmlFor={inputId}
        className={`${classes.tileButton} ${className}`.trim()}
      >
        <TileContent />
      </label>
      <input
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className={classes.fileInput}
      />
    </>
  );
}
