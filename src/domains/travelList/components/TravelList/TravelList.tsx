import LuggageEmoji from '@assets/images/Luggage.svg?react';
import { Link } from 'react-router-dom';
import classes from './TravelList.module.css';
import TravelItem from '../TravelItem/TravelItem';
import type { TravelInfo } from 'src/domains/travel/types/travel.type';

interface Props {
  travels: TravelInfo[];
}

export default function TravelList({ travels }: Props) {
  return (
    <div className={classes.container}>
      {travels.length === 0 ? (
        <div className={classes.noTravelWrapper}>
          <LuggageEmoji
            role="img"
            className={classes.luggageEmoji}
            aria-label="짐 이모지"
            width={150}
          />
          <div>
            <span className={classes.noTravelText}>
              아직 추가된 여행이 없습니다.
            </span>
            <br />
            <Link
              className={classes.newTravelLink}
              to="/new-travel"
              state={{ forward: true }}
              viewTransition
            >
              새 여행 추가하기
            </Link>
          </div>
        </div>
      ) : (
        travels.map(travel => (
          <TravelItem key={travel.travelId} travel={travel} />
        ))
      )}
    </div>
  );
}
