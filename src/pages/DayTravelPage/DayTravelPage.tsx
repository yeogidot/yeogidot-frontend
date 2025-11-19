import classes from './DayTravelPage.module.css';
import EditButton from '../../Buttons/EditButton.tsx';
import ShareButton from '../../Buttons/ShareButton.tsx';
import DeleteButton from '../../Buttons/DeleteButton.tsx';
import BackButton from '../../Buttons/BackButton.tsx';
import BackgroundMap from 'src/map/map.tsx';

export default function DayTravelPage() {
  return (
    <div className={classes.container}>

      <BackgroundMap />
      <BackButton />
      <div className={classes.panel}>

        <div className={classes.headerRow}>
          <h1 className={classes.header}>부산 여행</h1>

          <div className={classes.buttonGroup}>
            <EditButton />
            <ShareButton />
            <DeleteButton />
          </div>
        </div>

        <div className={classes.travelInformation}>
          <div>부산광역시</div>
          <div>2025-10-16 ~ 2025-10-18</div>
          <div className={classes.dayTravelRow}>
            <h3>1일차</h3>
            <div className={classes.dayTravelLocation}>부산광역시 부산진구, 수영구</div>
          </div>
        </div>

      </div>
    </div>
  );
}
