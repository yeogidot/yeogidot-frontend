export type WithReactNativeWebView = Window & {
  ReactNativeWebView?: { postMessage: (message: string) => void };
};

export function isReactNativeWebView(): boolean {
  return Boolean((window as WithReactNativeWebView).ReactNativeWebView);
}
