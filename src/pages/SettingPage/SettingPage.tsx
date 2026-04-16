import { Link, useNavigate } from 'react-router-dom';
import BlackBackIcon from '@assets/icons/back-black.svg';
import ChevronRightIcon from '@assets/icons/chevron-right.svg';
import classes from './SettingPage.module.css';

export default function SettingPage() {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <button
          className={classes.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
<img src={BlackBackIcon} alt="뒤로가기" />
        </button>
        <h1 className={classes.headerText}>개인 설정</h1>
      </header>
      <main className={classes.menuSection}>
        <ul className={classes.menuList}>
          <li>
            <Link
              className={classes.menuItem}
              to="/change-password"
              state={{ forward: true }}
              viewTransition
            >
              <span>비밀번호 변경</span>
              <img
                className={classes.chevronIcon}
                src={ChevronRightIcon}
                alt=""
                aria-hidden="true"
              />
            </Link>
          </li>
          <li>
            <button
              className={classes.menuItemButton}
              onClick={() => {
                localStorage.removeItem('accessToken');
                navigate('/login', {
                  state: { forward: true },
                  viewTransition: true,
                });
              }}
              type="button"
            >
              <span>로그아웃</span>
              <img
                className={classes.chevronIcon}
                src={ChevronRightIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
          </li>
          <li>
            <Link
              className={`${classes.menuItem} ${classes.dangerMenuItem}`}
              to="/delete-account"
              state={{ forward: true }}
              viewTransition
            >
              <span>회원탈퇴</span>
              <img
                className={classes.chevronIcon}
                src={ChevronRightIcon}
                alt=""
                aria-hidden="true"
              />
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
