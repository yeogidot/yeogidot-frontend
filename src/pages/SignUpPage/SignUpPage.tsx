import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classes from './SignUpPage.module.css'
import LogoImg from '../../assets/images/Logo.svg'
import BackButton from '../../components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import Button from '../../components/Buttons/Button/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from './SignUpSchema';

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = (data: SignUpForm) => {
    console.log(data);
    // axios.post('/api/signup', data)
  };

  return (
    <div className={classes.container}>
      <Link to='/login'>
        <div className={classes.backButton}>
          <BackButton/>
        </div>
      </Link>

      <img src={LogoImg} className={classes.logo} alt="Logo" />
        
      <form onSubmit={handleSubmit(onSubmit)} className={classes.signUpForm}>
        <div className={classes.idForm}>
          <h3>이메일</h3>
          <input {...register('email')} className={classes.idInput} />
          {errors.email && (
            <span className={classes.errorMessage}>
              {errors.email.message}
            </span>
          )}
        </div>

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

        <div className={classes.privacyPolicyContainer}>
          <label className={classes.checkPrivacyPolicy}>
            <input 
              {...register('agree')} 
              type="checkbox" 
              className={classes.checkboxInput}
            />
            <span>
              <a href="https://lilac-crystal-fca.notion.site/2fdc68016f76806b90b0ec82a710b7c9" target="_blank">개인정보약관</a>에 동의합니다.
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