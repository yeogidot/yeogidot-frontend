import classes from './MyTravelPage.module.css';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import TravelList from '@components/TravelList/TravelList';
import { Link } from 'react-router-dom';
import { mockTravels } from './mockTravelData';
export default function MyTravelPage() {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.headerText}>내 여행 목록</h1>
        <Link to="/login" className={classes.logoutLink}>
          로그아웃
        </Link>
      </header>
      <TravelList travels={mockTravels} />
      <NavigationBar nowTab="my-travel" />
    </>
  );
}
