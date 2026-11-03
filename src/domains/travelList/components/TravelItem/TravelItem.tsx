import { useState } from 'react';
import classes from './TravelItem.module.css';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@assets/icons/more-vert.svg?react';
import ImageIcon from '@assets/icons/image.svg?react';
import LocationOnIcon from '@assets/icons/location-on.svg?react';
import CalendarMonthIcon from '@assets/icons/calendar-month.svg?react';
import type { TravelInfo } from 'src/domains/travel/types/travel.type';

interface Props {
  travel: TravelInfo;
}

const METROPOLITAN_SUFFIX = /(광역시|특별시|특별자치시)$/;
const PROVINCE_SUFFIX = /(도|특별자치도)$/;
const CITY_SUFFIX = /(시|군|구)$/;

const formatRegion = (region: string) => {
  const [first, second] = region.split(' ');

  if (METROPOLITAN_SUFFIX.test(first)) {
    return first.replace(METROPOLITAN_SUFFIX, '');
  }
  if (PROVINCE_SUFFIX.test(first) && second) {
    return second.replace(CITY_SUFFIX, '');
  }
  return first.replace(CITY_SUFFIX, '');
};

const formatDate = (date: string) => date.replace(/-/g, '.');

export default function TravelItem({ travel }: Props) {
  const [hasLoadError, setHasLoadError] = useState(false);

  const travelPath = `/travel/${travel.travelId}`;
  const period = `${formatDate(travel.startDate)} ~ ${formatDate(travel.endDate)}`;

  const renderPhoto = () => {
    if (!travel.representativeImageUrl) {
      return (
        <div className={classes.emptyPhoto}>
          <ImageIcon className={classes.emptyIcon} aria-hidden="true" />
          <span className={classes.emptyText}>사진이 등록되지 않았습니다</span>
        </div>
      );
    }

    if (hasLoadError) {
      return (
        <div
          className={classes.errorPhoto}
          role="img"
          aria-label={`여행 ${travel.title}의 대표이미지`}
        />
      );
    }

    return (
      <img
        src={travel.representativeImageUrl}
        alt={`여행 ${travel.title}의 대표이미지`}
        className={classes.thumbnail}
        draggable={false}
        onError={() => setHasLoadError(true)}
        fetchPriority="high"
      />
    );
  };

  return (
    <div className={classes.itemContainer}>
      <Link
        to={travelPath}
        className={classes.photoLink}
        state={{ forward: true }}
        viewTransition
      >
        {renderPhoto()}
      </Link>
      <div className={classes.infoRow}>
        <Link
          to={travelPath}
          className={classes.infoLink}
          state={{ forward: true }}
          viewTransition
        >
          <span className={classes.title}>{travel.title}</span>
          <div className={classes.meta}>
            <LocationOnIcon className={classes.metaIcon} aria-hidden="true" />
            <span>{formatRegion(travel.trvRegion)}</span>
            <span className={classes.separator}>•</span>
            <CalendarMonthIcon
              className={classes.metaIcon}
              aria-hidden="true"
            />
            <span>{period}</span>
          </div>
        </Link>
        <Link
          to={`/edit-travel`}
          state={{ travel: { travelId: travel.travelId }, forward: true }}
          className={classes.editButton}
          aria-label="여행 편집"
          viewTransition
        >
          <MoreVertIcon aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
