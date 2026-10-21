import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { Routes } from './Routes';

// 라우터가 Routes.tsx 모듈 최상위에서 생성되므로,
// 이 파일은 연결을 확인하는 한 개의 테스트만 가져야 상태가 섞이지 않습니다.
describe('Routes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('만료된 토큰으로 진입하면 목록 화면을 거치지 않고 로그인으로 이동한다', async () => {
    localStorage.setItem('accessToken', 'expired-token');
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ message: '만료된 토큰' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        })
    );
    vi.stubGlobal('fetch', fetchMock);

    const screen = await render(<Routes />);

    await expect
      .element(screen.getByRole('button', { name: '로그인' }))
      .toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('accessToken')).toBeNull();
  });
});
