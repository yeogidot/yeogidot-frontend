import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={['/travel/1']}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/travel/:travelId" element={<div>여행 상세 화면</div>} />
        </Route>
        <Route path="/login" element={<div>로그인 화면</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('토큰이 없으면 모달 없이 로그인 페이지로 보낸다', async () => {
    const screen = await renderProtected();

    await expect.element(screen.getByText('로그인 화면')).toBeInTheDocument();
    expect(await screen.getByRole('dialog').query()).toBeNull();
  });

  it('토큰이 있으면 자식 페이지를 렌더한다', async () => {
    localStorage.setItem('accessToken', 'stored-token');

    const screen = await renderProtected();

    await expect
      .element(screen.getByText('여행 상세 화면'))
      .toBeInTheDocument();
  });
});
