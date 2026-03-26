import classes from './NavigationBar.module.css';
import DeactivatedMapIcon from '@assets/icons/map-deactivated.svg?react';
import ActivatedMapIcon from '@assets/icons/map-activated.svg?react';
import ActivatedMyTravelIcon from '@assets/icons/my-travel-activated.svg?react';
import DeactivatedMyTravelIcon from '@assets/icons/my-travel-deactivated.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import { Link } from 'react-router-dom';

interface Props {
  nowTab: 'map' | 'my-travel';
}

export default function NavigationBar({ nowTab }: Props) {
  return (
    <nav className={classes.container}>
      <Link
        to="/map"
        className={
          nowTab === 'map' ? classes.tabActivated : classes.tabDeactivated
        }
      >
        {nowTab === 'map' ? <ActivatedMapIcon /> : <DeactivatedMapIcon />}
        <br />
        <span>지도</span>
      </Link>
      <Link
        to={'/new-travel'}
        className={classes.newTravelButton}
        aria-label="새 여행추가"
        state={{ forward: true }}
        viewTransition
      >
        <AddIcon />
      </Link>
      <Link
        to="/my-travel"
        className={
          nowTab === 'my-travel' ? classes.tabActivated : classes.tabDeactivated
        }
      >
        {nowTab === 'my-travel' ? (
          <ActivatedMyTravelIcon />
        ) : (
          <DeactivatedMyTravelIcon />
        )}
        <br />
        <span>내 여행 목록</span>
      </Link>
    </nav>
  );
}
