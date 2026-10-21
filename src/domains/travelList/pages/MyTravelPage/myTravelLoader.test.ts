import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { myTravelLoader } from './myTravelLoader';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function locationOf(result: unknown) {
  expect(result).toBeInstanceOf(Response);
  return (result as Response).headers.get('location');
}

describe('myTravelLoader', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('토큰이 없으면 로그인으로 보낸다', async () => {
    const result = await myTravelLoader();

    expect(locationOf(result)).toBe('/login');
  });

  it('목록 요청이 401이면 토큰을 지우고 로그인으로 보낸다', async () => {
    localStorage.setItem('accessToken', 'expired-token');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => jsonResponse({ message: '만료' }, 401))
    );

    const result = await myTravelLoader();

    expect(locationOf(result)).toBe('/login');
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('네트워크 오류는 세션을 유지하고 오류 상태를 돌려준다', async () => {
    localStorage.setItem('accessToken', 'stored-token');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('오프라인');
      })
    );

    await expect(myTravelLoader()).resolves.toEqual({
      travels: [],
      error: true,
    });
    expect(localStorage.getItem('accessToken')).toBe('stored-token');
  });

  it('토큰이 유효하면 목록을 돌려준다', async () => {
    const travels = [
      {
        title: '서울',
        travelId: 1,
        representativeImageUrl: 'https://example.com/seoul.jpg',
        startDate: '2026-01-01',
        endDate: '2026-01-02',
        trvRegion: '서울',
      },
    ];
    localStorage.setItem('accessToken', 'valid-token');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => jsonResponse(travels))
    );

    await expect(myTravelLoader()).resolves.toEqual({
      travels,
      error: false,
    });
  });
});
