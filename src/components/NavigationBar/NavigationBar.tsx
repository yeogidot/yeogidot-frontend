import classes from './NavigationBar.module.css';
import MapIcon from '@assets/icons/map.svg?react';
import PhotoLibraryIcon from '@assets/icons/photo-library.svg?react';
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
        <MapIcon className={classes.mapIcon} aria-hidden="true" />
        <span className={classes.tabLabel}>지도</span>
      </Link>
      <div className={classes.newTravelWrapper}>
        <Link
          to={'/new-travel'}
          className={classes.newTravelLink}
          aria-label="새 여행추가"
          state={{ forward: true }}
          viewTransition
        >
          <span className={classes.newTravelButton}>
            <AddIcon className={classes.addIcon} aria-hidden="true" />
          </span>
        </Link>
      </div>
      <Link
        to="/my-travel"
        className={
          nowTab === 'my-travel' ? classes.tabActivated : classes.tabDeactivated
        }
      >
        <PhotoLibraryIcon
          className={classes.photoLibraryIcon}
          aria-hidden="true"
        />
        <span className={classes.tabLabel}>내 여행 목록</span>
      </Link>
    </nav>
  );
}
