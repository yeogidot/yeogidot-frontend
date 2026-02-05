import classes from './TravelItem.module.css';
import { Link } from 'react-router-dom';
import EditIcon from '@assets/icons/edit.svg?react';
import type { TravelInfo } from 'src/types/travel.type';
interface Props {
  travel: TravelInfo;
}

export default function TravelItem({ travel }: Props) {
  return (
    <div className={classes.itemContainer}>
      <Link to={`/travel/${travel.travelId}`} className={classes.thumbnailLink}>
        <img
          src={travel.representativeImageUrl}
          alt={`여행 ${travel.title}의 대표이미지`}
          className={classes.thumbnail}
          draggable={false}
        />
      </Link>
      <Link to={`/travel/${travel.travelId}`} className={classes.infoContainer}>
        <span className={classes.title}>{travel.title}</span> <br />
        {travel.startDate} ~ {travel.endDate} <br />
        {travel.trvRegion}
      </Link>
      <Link to={`/edit/${travel.travelId}`} className={classes.editButton}>
        <EditIcon />
      </Link>
    </div>
  );
}
