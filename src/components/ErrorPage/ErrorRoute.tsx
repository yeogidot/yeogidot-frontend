import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function ErrorRoute() {
  const { status } = useParams<{ status: string }>();
  const parsedStatus = Number(status);
  const safeStatus = Number.isNaN(parsedStatus) ? null : parsedStatus;

  const messageByStatus: Record<number, string> = {
    401: '로그인이 필요한 서비스 입니다.',
    403: '접근 권한이 없습니다.',
    404: '요청하신 페이지를 찾을 수 없습니다.',
    500: '서버 내부 오류가 발생했습니다.',
  };

  const message =
    safeStatus && messageByStatus[safeStatus]
      ? messageByStatus[safeStatus]
      : undefined;

  return <ErrorPage status={safeStatus} message={message} />;
}
