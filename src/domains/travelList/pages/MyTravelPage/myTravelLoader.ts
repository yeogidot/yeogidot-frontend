import { redirect } from 'react-router-dom';
import { travelService } from 'src/apis/services/travel';
import { HttpError } from 'src/types/error.type';
import type { TravelInfo } from 'src/domains/travel/types/travel.type';

export type MyTravelLoaderData = {
  travels: TravelInfo[];
  error: boolean;
};

/**
 * 내 여행 목록 진입 시 서버에 토큰을 실제로 확인합니다.
 * 목록 요청 결과가 곧 검증 응답이라 요청이 추가되지 않습니다.
 * 만료(401)만 세션을 정리하고, 네트워크 등 그 외 오류는 로그인으로 보내지 않습니다.
 */
export async function myTravelLoader(): Promise<MyTravelLoaderData | Response> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return redirect('/login');
  }

  try {
    const response = await travelService.getTravels(token);
    return { travels: response.data ?? [], error: false };
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      localStorage.removeItem('accessToken');
      return redirect('/login');
    }

    return { travels: [], error: true };
  }
}
