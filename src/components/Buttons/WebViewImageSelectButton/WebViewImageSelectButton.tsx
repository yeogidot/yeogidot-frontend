import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import Button from '../Button/Button';
import classes from './WebViewImageSelectButton.module.css';
import type { WithReactNativeWebView } from '@utils/webview';

export const WEBVIEW_IMAGE_SELECT_MESSAGE_TYPE = 'SELECT_IMAGES' as const;

type WebViewImageSelectMessage = {
  type: typeof WEBVIEW_IMAGE_SELECT_MESSAGE_TYPE;
  allowMultiple?: boolean;
};

export type WebViewImageSelectButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  webviewMessage?: WebViewImageSelectMessage;
  allowMultiple?: boolean;
};

function postImageSelectToWebView(payload: WebViewImageSelectMessage) {
  const w = window as WithReactNativeWebView;
  w.ReactNativeWebView?.postMessage(JSON.stringify(payload));
}

export default function WebViewImageSelectButton({
  onClick,
  webviewMessage,
  allowMultiple = true,
  className = '',
  children,
  ...props
}: WebViewImageSelectButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const payload =
      webviewMessage ??
      ({
        type: WEBVIEW_IMAGE_SELECT_MESSAGE_TYPE,
        allowMultiple,
      } satisfies WebViewImageSelectMessage);

    postImageSelectToWebView(payload);
    onClick?.(event);
  };

  return (
    <Button
      type="button"
      className={`${classes.touchTarget} ${className}`.trim()}
      aria-label="이미지 선택"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}
