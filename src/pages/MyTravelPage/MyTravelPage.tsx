import classes from './MyTravelPage.module.css';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import TravelList from '@components/TravelList/TravelList';
import { useApi } from '@hooks/api';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { travelService } from 'src/apis/services/travel';
export default function MyTravelPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
    if (token) {
      request(token).then(() => {
        if (status === 403) {
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
        }
      });
    }
  }, [token]);
  const { data, error, request, loading, status } = useApi(
    travelService.getTravels
  );
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.headerText}>내 여행 목록</h1>
        <Link
          to="/login"
          onClick={() => localStorage.removeItem('accessToken')}
          className={classes.logoutLink}
        >
          로그아웃
        </Link>
      </header>
      {error ? error : ''}
      {loading || !data ? (
        <div className={classes.loadingText}>불러오는 중...</div>
      ) : (
        <TravelList travels={data} />
      )}
      <NavigationBar nowTab="my-travel" />
    </>
  );
}
