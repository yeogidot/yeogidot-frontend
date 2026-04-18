import { useNavigate } from 'react-router-dom';
import classes from './DeleteAccountCompletePage.module.css';

export default function DeleteAccountCompletePage() {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <main className={classes.content}>
        <h1 className={classes.title}>회원탈퇴 완료</h1>
        <p className={classes.description}>
          그동안 여기닷을 이용해주셔서 감사합니다.
        </p>
        <button
          className={classes.loginButton}
          onClick={() => {
            localStorage.removeItem('accessToken');
            navigate('/login', {
              viewTransition: true,
              state: { forward: true },
            });
          }}
        >
          로그인 화면으로 이동
        </button>
      </main>
    </div>
  );
}
