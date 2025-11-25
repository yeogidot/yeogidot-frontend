import classes from './TravelItem.module.css';
import { Link } from 'react-router-dom';
import EditIcon from '@assets/icons/edit.svg?react';
interface Props {
  travel: {
    title: string;
    id: number;
    thumbnail: string | undefined;
    startDate: string;
    endDate: string;
    location: string;
  };
}

export default function TravelItem({ travel }: Props) {
  return (
    <div className={classes.itemContainer}>
      <Link to={`/travel/${travel.id}`} className={classes.thumbnailLink}>
        <img
          src={travel.thumbnail}
          alt={`여행 ${travel.title}의 대표이미지`}
          className={classes.thumbnail}
          draggable={false}
        />
      </Link>
      <Link to={`/travel/${travel.id}`} className={classes.infoContainer}>
        <span className={classes.title}>{travel.title}</span> <br />
        {travel.startDate} ~ {travel.endDate} <br />
        {travel.location}
      </Link>
      <Link to={`/edit/${travel.id}`} className={classes.editButton}>
        <EditIcon />
      </Link>
    </div>
  );
}
