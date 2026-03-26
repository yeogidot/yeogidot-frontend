import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import classes from './LogInPage.module.css';
import LogoImg from '../../assets/images/Logo.svg';
import BackButton from '../../components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import Button from '../../components/Buttons/Button/Button';
import { authService } from '../../apis/services/auth';
import type { LoginInput } from '../../types/auth.type'; // 타입 경로 확인 필요

export default function LogInPage() {
  const navigate = useNavigate();

  // 1. React Hook Form 설정
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>();

  // 2. 로그인 제출 핸들러
  const onSubmit = async (data: LoginInput) => {
    try {
      // API 호출
      const response = await authService.login(data);

      // 3. 성공 처리
      if (response.data) {
        const token = response.data;

        // 예시: 토큰이 객체이고 accessToken 프로퍼티가 있다면
        localStorage.setItem('accessToken', token.access_token);

        // 메인 페이지로 이동
        alert('로그인에 성공했습니다.');
        navigate('/');
      }
    } catch (error: any) {
      // 4. 에러 처리 (http.ts에서 던진 에러 잡기)
      console.error(error);

      const status = error.statusCode || error.status || error.response?.status;

      if (status === 400) {
        setError('password', { message: '이메일과 비밀번호를 입력해주세요.' });
      } else if (status === 403) {
        setError('password', {
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        });
      } else if (status === 404) {
        setError('email', { message: '가입되지 않은 이메일입니다.' });
      } else {
        const errorMessage = error.message || '로그인에 실패했습니다.';
        alert(errorMessage);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Link to="/..">
        <div className={classes.backButton}>
          <BackButton />
        </div>
      </Link>

      <img src={LogoImg} className={classes.logo} alt="Logo" />

      {/* 5. form 태그로 감싸고 onSubmit 연결 */}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.logInForm}>
        <div className={classes.idForm}>
          <h2>이메일</h2>
          <input
            {...register('email', { required: '이메일을 입력해주세요' })}
            className={classes.idInput}
            type="email"
          />
          {errors.email && (
            <span className={classes.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        <div className={classes.passwordForm}>
          <h2>비밀번호</h2>
          <input
            {...register('password', { required: '비밀번호를 입력해주세요' })}
            type="password"
            className={classes.passwordInput}
          />
          {errors.password && (
            <span className={classes.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <Link to="/signup" className={classes.signUp}>
          회원가입
        </Link>

        {/* 버튼 타입 submit으로 지정 */}
        <Button type="submit" className={classes.logInButton}>
          로그인
        </Button>
      </form>
    </div>
  );
}
