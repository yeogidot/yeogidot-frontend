import { useNavigate } from 'react-router-dom';
import classes from './ErrorPage.module.css';

interface ErrorPageProps {
  status?: number | null;
  message?: string;
}

export default function ErrorPage({ status, message }: ErrorPageProps) {
  const navigate = useNavigate();

  let title = '오류가 발생했습니다';
  let description = message || '요청하신 페이지를 불러오는 중 문제가 발생했습니다.';

  if (status === 401 || status === 403) {
    title = '접근 권한이 없습니다';
    description = '해당 페이지에 접근할 수 있는 권한이 확인되지 않았습니다. 로그인이 필요하거나 권한이 부족할 수 있습니다.';
  } else if (status === 404) {
    title = '존재하지 않는 페이지입니다';
    description = '요청하신 페이지를 찾을 수 없거나 이미 삭제된 항목입니다.';
  } else if (status === 500) {
    title = '서버 내부 오류가 발생했습니다';
    description = '서버 처리 과정에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.errorCode}>{status || 'Error'}</h1>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
      
      <div className={classes.buttonGroup}>
        <button className={`${classes.button} ${classes.secondaryButton}`} onClick={() => navigate(-1)}>
          이전으로
        </button>
        <button className={`${classes.button} ${classes.primaryButton}`} onClick={() => navigate('/my-travel')}>
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
