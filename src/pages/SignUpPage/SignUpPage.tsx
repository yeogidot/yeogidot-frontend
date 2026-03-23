import { useNavigate, Link } from 'react-router-dom'; // useNavigate 추가
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import classes from './SignUpPage.module.css';
import LogoImg from '../../assets/images/Logo.svg';
import BackButton from '../../components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import Button from '../../components/Buttons/Button/Button';
import { SignUpSchema } from './SignUpSchema';

// API 서비스 import
import { authService } from '../../apis/services/auth';

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange' // 입력할 때마다 실시간으로 유효성 검사 (선택 사항)
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      console.log('회원가입 요청 데이터:', data);

      await authService.signUp({
        email: data.email,
        password: data.password,
        password_check: data.passwordCheck,
        privacy_policy_agreed: data.agree
      } as any);

      // 성공 시 처리
      alert('회원가입이 성공적으로 완료되었습니다!\n로그인 페이지로 이동합니다.');
      navigate('/login', {
        viewTransition: true,
        state: { forward: true },
      });

    } catch (error: any) {
      console.error('회원가입 에러:', error);

      const status = error.statusCode || error.status || error.response?.status;

      if (status === 400) {
        setError('email', { message: '중복된 이메일입니다.' });
      } else {
        const errorMsg = error.responseBody || error.message || "알 수 없는 에러";
        const statusCode = status || "";
        alert(`회원가입 실패 (${statusCode}):\n${errorMsg}`);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Link to="/login" state={{ forward: true }} viewTransition>
        <div className={classes.backButton}>
          <BackButton />
        </div>
      </Link>

      <img src={LogoImg} className={classes.logo} alt="Logo" />

      {/* 폼 제출 핸들러 연결 */}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.signUpForm}>

        {/* 이메일 */}
        <div className={classes.idForm}>
          <h3>이메일</h3>
          <input
            {...register('email')}
            className={classes.idInput}
          />
          {errors.email && (
            <span className={classes.errorMessage}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* 비밀번호 */}
        <div className={classes.passwordForm}>
          <h3>비밀번호</h3>
          <input
            {...register('password')}
            type="password"
            className={classes.passwordInput}
          />
          {errors.password && (
            <span className={classes.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className={classes.passwordCheckForm}>
          <h3>비밀번호 확인</h3>
          <input
            {...register('passwordCheck')}
            type="password"
            className={classes.passwordCheckInput}
          />
          {errors.passwordCheck && (
            <span className={classes.errorMessage}>
              {errors.passwordCheck.message}
            </span>
          )}
        </div>

        {/* 약관 동의 (체크박스 버전) */}
        <div className={classes.privacyPolicyContainer}>
          <label className={classes.checkPrivacyPolicy}>
            <input
              {...register('agree')}
              type="checkbox"
              className={classes.checkboxInput}
            />
            <span>
              <a href="https://lilac-crystal-fca.notion.site/2fdc68016f76806b90b0ec82a710b7c9">개인정보약관</a>에 동의하시겠습니까?
            </span>
          </label>

          {errors.agree && (
            <span className={classes.errorMessage}>
              {errors.agree.message}
            </span>
          )}
        </div>

        <Button type="submit" className={classes.signUpButton}>회원가입</Button>
      </form>

    </div>
  );
}