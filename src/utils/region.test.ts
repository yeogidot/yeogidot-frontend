import { describe, it, expect } from 'vitest';
import { formatCardRegion } from './region';

describe('formatCardRegion', () => {
  it.each([
    ['경기도 수원시', '수원'],
    ['경기도 성남시 분당구', '성남 분당구'],
    ['제주특별자치도 서귀포시', '서귀포'],
    ['제주특별자치도', '제주'],
    ['부산광역시', '부산'],
    ['부산광역시 해운대구', '부산 해운대구'],
    ['서울특별시 강남구', '서울 강남구'],
    ['세종특별자치시', '세종'],
    ['수원시', '수원'],
  ])('%s → %s', (input, expected) => {
    expect(formatCardRegion(input)).toBe(expected);
  });
});
