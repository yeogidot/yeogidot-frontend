import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';

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
  beforeEach(() => {
    localStorage.clear();
  });

  it('토큰이 없으면 앱 진입 시 로그인 페이지로 이동한다', async () => {
    const screen = await render(<App />);

    await expect
      .element(screen.getByRole('button', { name: '로그인' }))
      .toBeInTheDocument();

    // 보호된 기본 라우팅을 거쳐 "권한없음" 모달이 열리는 옛 동작이 아니어야 한다
    expect(await screen.getByRole('dialog').query()).toBeNull();
  });
});
