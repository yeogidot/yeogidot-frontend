import BlackBackIcon from '@assets/icons/back-black.svg';
import Button from '@components/Buttons/Button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './DeleteAccountPage.module.css';
import { useApi } from '@hooks/api';
import { authService } from 'src/apis/services/auth';
import useModal from '@hooks/useModal';

const DELETE_ACCOUNT_ERROR_MESSAGES: Record<number, string> = {
  400: '비밀번호가 일치하지 않습니다.',
  401: '인증이 필요합니다.',
};

export default function DeleteAccountPage() {
  const navigate = useNavigate();
  const { openModal, modalElement } = useModal();
  const [password, setPassword] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const { status, request } = useApi(authService.deleteAccount);
  const token = localStorage.getItem('accessToken');
  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value !== '') {
      setPasswordErrorText('');
    }
    setPassword(event.target.value);
  };

  const handleDeleteButtonClick = () => {
    if (password.trim() === '') {
      setPasswordErrorText('비밀번호를 입력해주세요.');
      return;
    }
    openModal({
      title: '정말로 탈퇴하겠습니까?',
      message:
        '확인을 누르면 회원 탈퇴가 완료되고 데이터는 복구할 수 없습니다.',
      onConfirm: handleConfirmDelete,
    });
  };

  const handleConfirmDelete = async () => {
    if (!token) {
      openModal({
        title: '회원탈퇴 실패',
        message: DELETE_ACCOUNT_ERROR_MESSAGES[401],
      });
      return;
    }
    await request(password, token);
  };

  useEffect(() => {
    if (status === null) {
      return;
    }
    if (status === 200) {
      navigate('/delete-account/complete', {
        viewTransition: true,
        state: { forward: true },
      });
      return;
    }

    openModal({
      title: '회원탈퇴 실패',
      message:
        DELETE_ACCOUNT_ERROR_MESSAGES[status] ??
        '회원탈퇴 중 오류가 발생했습니다.',
    });
  }, [navigate, openModal, status]);

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <button
          className={classes.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={BlackBackIcon} alt="뒤로가기 버튼 이미지" />
        </button>
        <h1 className={classes.headerText}>회원탈퇴</h1>
      </header>
      <main className={classes.content}>
        <h2 className={classes.pageTitle}>여기닷 앱 회원 탈퇴</h2>
        <p className={classes.warningText}>
          회원탈퇴 시 아래 데이터가 모두 삭제되며 복구할 수 없습니다.
        </p>
        <ul className={classes.deletedDataList}>
          <li>사용자 이메일</li>
          <li>업로드한 사진</li>
          <li>여행 데이터 (여행 정보, 코멘트, 여행일기 등)</li>
          <li>그 외 사용자와 관련된 모든 데이터</li>
        </ul>
        <section className={classes.inputSection}>
          <h3 className={classes.inputHeader}>비밀번호 확인</h3>
          <input
            className={`${classes.textInput} ${passwordErrorText !== '' ? classes.textInputError : ''}`}
            onChange={handlePasswordInputChange}
            value={password}
            type="password"
            id="delete-account-password"
            autoComplete="off"
          />
          <p
            className={`${classes.errorHelperText} ${passwordErrorText === '' ? classes.invisible : ''}`}
          >
            {passwordErrorText === '' ? '오류 없음' : passwordErrorText}
          </p>
        </section>
        <Button
          className={classes.deleteButton}
          onClick={handleDeleteButtonClick}
        >
          탈퇴 진행하기
        </Button>
      </main>
      {modalElement}
    </div>
  );
}
