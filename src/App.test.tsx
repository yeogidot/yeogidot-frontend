import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

vi.mock('react-naver-maps', () => ({
  NavermapsProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  Container: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  NaverMap: () => <div data-testid="naver-map" />,
  Marker: () => null,
  InfoWindow: () => null,
  Circle: () => null,
  Polygon: () => null,
  Polyline: () => null,
  Rectangle: () => null,
  GroundOverlay: () => null,
  CustomOverlay: () => null,
}));

import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    await expect.element(page.getByRole('dialog')).toBeInTheDocument();
  });
});
