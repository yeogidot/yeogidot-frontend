import classes from './MyTravelPage.module.css';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import TravelList from '../../components/TravelList/TravelList';
import { Link, useLoaderData } from 'react-router-dom';
import type { MyTravelLoaderData } from './myTravelLoader';

export default function MyTravelPage() {
  const { travels, error } = useLoaderData<MyTravelLoaderData>();

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
      {error ? (
        <div className={classes.errorText}>
          여행 목록을 불러오지 못했습니다.
          <br />
          새로고침 해주세요.
        </div>
      ) : (
        <TravelList travels={travels} />
      )}
      <NavigationBar nowTab="my-travel" />
    </>
  );
}
