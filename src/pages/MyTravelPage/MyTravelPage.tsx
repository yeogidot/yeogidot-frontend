import classes from './MyTravelPage.module.css';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import TravelList from '@components/TravelList/TravelList';
import { useApi } from '@hooks/api';
import useModal from '@hooks/useModal';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { travelService } from 'src/apis/services/travel';
export default function MyTravelPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const { openModal, modalElement } = useModal();
  const { data, error, request, loading, status } = useApi(
    travelService.getTravels
  );

  useEffect(() => {
    if (token) {
      request(token);
    }
  }, [token, request]);

  useEffect(() => {
    if (!token || status === 401) {
      openModal({
        title: '권한없음',
        message: '로그인이 필요한 서비스입니다.',
        onCancel: () => navigate('/error/401'),
        onConfirm: () =>
          navigate('/login', {
            viewTransition: true,
            state: { forward: true },
          }),
      });
      return;
    }
  }, [token, status, navigate, openModal]);

  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.headerText}>내 여행 목록</h1>
        <Link
          to="/setting"
          state={{ forward: true }}
          viewTransition
          className={classes.menuLink}
        >
          개인 설정
        </Link>
      </header>
      {error ? error : ''}
      {loading || !data ? (
        <div className={classes.loadingText}>불러오는 중...</div>
      ) : (
        <TravelList travels={data} />
      )}
      <NavigationBar nowTab="my-travel" />
      {modalElement}
    </>
  );
}
