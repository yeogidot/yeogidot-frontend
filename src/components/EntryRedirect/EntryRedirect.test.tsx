import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EntryRedirect from './EntryRedirect';

function renderEntry(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<EntryRedirect />} />
        <Route path="/login" element={<div>로그인 화면</div>} />
        <Route path="/my-travel" element={<div>여행 목록 화면</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EntryRedirect', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('토큰이 없으면 로그인 페이지로 보낸다', async () => {
    const screen = await renderEntry('/');

    await expect.element(screen.getByText('로그인 화면')).toBeInTheDocument();
  });

  it('토큰이 있으면 여행 목록으로 보낸다', async () => {
    localStorage.setItem('accessToken', 'stored-token');

    const screen = await renderEntry('/');

    await expect
      .element(screen.getByText('여행 목록 화면'))
      .toBeInTheDocument();
  });
});
