import classes from './MyTravelPage.module.css';
import AppBar from '@components/AppBar/AppBar';
import appBarClasses from '@components/AppBar/AppBar.module.css';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import TravelList from '../../components/TravelList/TravelList';
import { Link, useLoaderData } from 'react-router-dom';
import SettingsIcon from '@assets/icons/settings.svg?react';
import type { MyTravelLoaderData } from './myTravelLoader';

export default function MyTravelPage() {
  const { travels, error } = useLoaderData<MyTravelLoaderData>();

  return (
    <div className={classes.page}>
      <AppBar
        title="내 여행 목록"
        rightAction={
          <Link
            to="/setting"
            state={{ forward: true }}
            viewTransition
            className={appBarClasses.actionLink}
            aria-label="설정"
          >
            <SettingsIcon
              className={appBarClasses.actionIcon}
              aria-hidden="true"
            />
          </Link>
        }
      />
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
    </div>
  );
}
