import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './LogInPage.module.css'
import LogoImg from '../../assets/images/Logo.svg'
import Button from '../../components/Buttons/Button/Button';

export default function LogInPage() {
  return (
    <div className={classes.container}>
      <img src={LogoImg} className={classes.logo}/>
        

      <div className={classes.logInForm}>
        <div className={classes.idForm}>
            <h2>이메일</h2>
            <input className={classes.idInput}/>
        </div>
        <div className={classes.passwordForm}>
            <h2>비밀번호</h2>
            <input className={classes.passwordInput}/>
        </div>

        <a className={classes.signIn}>회원가입</a>
      </div>

      <Button className={classes.logInButton}>로그인</Button>
    </div>
  );
}
