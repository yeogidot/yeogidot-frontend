import BlackBackIcon from '@assets/icons/back-black.svg';
import Button from '@components/Buttons/Button/Button';
import Modal from '@components/Modal/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './DeleteAccountPage.module.css';

export default function DeleteAccountPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmModalOpen(false);
    navigate('/delete-account/complete', {
      viewTransition: true,
      state: { forward: true },
    });
  };

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
      <Modal.Root
        isOpen={isConfirmModalOpen}
        onCancel={() => {
          setIsConfirmModalOpen(false);
        }}
      >
        <Modal.Title>정말로 탈퇴하겠습니까?</Modal.Title>
        <p className={classes.modalMessage}>
          확인을 누르면 회원 탈퇴가 완료되고 데이터는 복구할 수 없습니다.
        </p>
        <Modal.ButtonGroup>
          <Modal.Button
            variant="gray"
            onClick={() => {
              setIsConfirmModalOpen(false);
            }}
          >
            취소
          </Modal.Button>
          <Modal.Button variant="red" onClick={handleConfirmDelete}>
            확인
          </Modal.Button>
        </Modal.ButtonGroup>
      </Modal.Root>
    </div>
  );
}
