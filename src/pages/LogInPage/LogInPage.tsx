import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classes from './LogInPage.module.css'
import LogoImg from '../../assets/images/Logo.svg'
import BackButton from '../../components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import Button from '../../components/Buttons/Button/Button';

export default function LogInPage() {
  return (
    <div className={classes.container}>
      <Link to='/..'>
        <div className={classes.backButton}>
          <BackButton/>
        </div>
      </Link>
      
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

        <Link to="/signin" className={classes.signIn}>회원가입</Link>
      </div>

      <Button className={classes.logInButton}>로그인</Button>
    </div>
  );
}
