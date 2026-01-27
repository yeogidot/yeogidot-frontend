import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classes from './SignInPage.module.css'
import LogoImg from '../../assets/images/Logo.svg'
import BackButton from '../../components/Buttons/BackButton/BlackBackButton/BlackBackButton';
import Button from '../../components/Buttons/Button/Button';

export default function LogInPage() {
  return (
    <div className={classes.container}>
      <Link to='/login'>
        <div className={classes.backButton}>
          <BackButton/>
        </div>
      </Link>

      <img src={LogoImg} className={classes.logo}/>
        

      <div className={classes.signInForm}>
        <div className={classes.idForm}>
            <h3>이메일</h3>
            <input className={classes.idInput}/>
        </div>
        <div className={classes.passwordForm}>
            <h3>비밀번호</h3>
            <input className={classes.passwordInput}/>
        </div>
        <div className={classes.passwordCheckForm}>
            <h3>비밀번호 확인</h3>
            <input className={classes.passwordCheckInput}/>
        </div>
        <div className={classes.privacyPolicy}>
            <a>개인정보약관</a>에 동의하시겠습니까?
        </div>
        <form className={classes.checkPrivacyPolicy}>
          <label>
              예<input type="radio" name="option" value="1" defaultChecked/>
          </label>
          <label>
              아니오<input type="radio" name="option" value="2"/>
          </label>
        </form>
      </div>

      <Button className={classes.signInButton}>회원가입</Button>
    </div>
  );
}
