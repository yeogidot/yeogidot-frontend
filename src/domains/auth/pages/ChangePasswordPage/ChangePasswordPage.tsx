import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import BackButton from '@components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import Button from '@components/Buttons/Button/Button';
import classes from './ChangePasswordPage.module.css';
import { ChangePasswordSchema } from './ChangePasswordSchema';
import useModal from '@hooks/useModal';
import type { ChangePasswordInput } from '../../types/auth.type';
import { authService } from 'src/apis/services/auth';

type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>;

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { openModal, modalElement } = useModal();

  const token = localStorage.getItem('accessToken');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      if (!token) {
        openModal({
          title: '비밀번호 변경 실패',
          message: '로그인이 필요합니다.',
          onConfirm: () => navigate('/login'),
        });
        return;
      }

      const input: ChangePasswordInput = {
        password: data.password,
        new_password: data.new_password,
      };

      await authService.changePassword(input, token);

      // 성공 시 처리
      openModal({
        title: '비밀번호 변경 완료',
        message: '비밀번호가 성공적으로 변경되었습니다!',
        onConfirm: () => navigate(-1),
        onCancel: () => navigate(-1),
      });
    } catch (error: any) {
      console.error('비밀번호 변경 에러:', error);

      const status = error.status;

      if (status === 400) {
        setError('password', {
          message: '비밀번호가 일치하지 않거나 새 비밀번호와 같습니다.',
        });
      } else if (status === 401) {
        openModal({
          title: '인증 만료',
          message: '인증이 만료되었습니다. 다시 로그인해주세요.',
          onConfirm: () => navigate('/login'),
          onCancel: () => navigate('/login'),
        });
      } else {
        const errorMsg = error.message || '알 수 없는 에러';
        const statusCode = status || '';
        openModal({
          title: '비밀번호 변경 실패',
          message: `비밀번호 변경 실패 (${statusCode})\n${errorMsg}`,
        });
      }
    }
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className={classes.headerText}>비밀번호 변경</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.changePasswordForm}
      >
        {/* 현재 비밀번호 */}
        <div className={classes.passwordForm}>
          <h3>현재 비밀번호</h3>
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

        {/* 새 비밀번호 */}
        <div className={classes.newPasswordForm}>
          <h3>새 비밀번호</h3>
          <input
            {...register('new_password')}
            type="password"
            className={classes.newPasswordInput}
          />
          {errors.new_password && (
            <span className={classes.errorMessage}>
              {errors.new_password.message}
            </span>
          )}
        </div>

        {/* 새 비밀번호 확인 */}
        <div className={classes.passwordCheckForm}>
          <h3>새 비밀번호 확인</h3>
          <input
            {...register('new_password_check')}
            type="password"
            className={classes.passwordCheckInput}
          />
          {errors.new_password_check && (
            <span className={classes.errorMessage}>
              {errors.new_password_check.message}
            </span>
          )}
        </div>

        <Button type="submit" className={classes.submitButton}>
          변경
        </Button>
      </form>
      {modalElement}
    </div>
  );
}
