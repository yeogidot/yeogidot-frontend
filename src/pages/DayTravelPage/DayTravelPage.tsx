import classes from './DayTravelPage.module.css';
import EditButton from '../../Buttons/EditButton.tsx';
import ShareButton from '../../Buttons/ShareButton.tsx';
import DeleteButton from '../../Buttons/DeleteButton.tsx';
import mapImage from '../../assets/images/map.png'; // 지도 이미지

export default function DayTravelPage() {
  return (
    <div>
      <h1 className={classes.header}>일차별 여행목록 페이지</h1>
      <EditButton />
      <ShareButton />
      <DeleteButton />
    </div>
  );
}
