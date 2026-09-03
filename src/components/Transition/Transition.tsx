import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useRef } from 'react';

type NavState = { forward?: boolean };
export function Transition() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { forward } = (location.state ?? {}) as NavState;
  const prevHistoryIndexRef = useRef<number | null>(null);
  const isForwardRef = useRef<boolean>(Boolean(forward));

  useEffect(() => {
    const currentHistoryIndex =
      typeof window.history.state?.idx === 'number'
        ? window.history.state.idx
        : null;
    const prevHistoryIndex = prevHistoryIndexRef.current;

    let isForward = Boolean(forward);

    if (
      navigationType === 'POP' &&
      prevHistoryIndex !== null &&
      currentHistoryIndex !== null
    ) {
      isForward = currentHistoryIndex > prevHistoryIndex;
    }

    isForwardRef.current = isForward;
    document.documentElement.dataset.direction = isForwardRef.current
      ? 'forward'
      : 'back';
    prevHistoryIndexRef.current = currentHistoryIndex;
  }, [forward, navigationType, location.key]);

  return <Outlet />;
}
