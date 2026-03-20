import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type NavState = { forward?: boolean };
export function Transition() {
  const location = useLocation();
  const { forward } = (location.state ?? {}) as NavState;

  useEffect(() => {
    document.documentElement.dataset.direction = forward ? 'forward' : 'back';
  }, [forward]);

  return <Outlet />;
}
