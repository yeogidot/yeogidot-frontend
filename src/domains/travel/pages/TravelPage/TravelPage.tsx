import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CustomOverlay } from 'react-naver-maps';
import classes from './TravelPage.module.css';
import AppBar from '@components/AppBar/AppBar';
import BackgroundMap, { type MapBounds } from '../../components/Map/Map';
import MiniMapMarker from '../../components/Map/MiniMapMarker';
import DeleteConfirmModal from '@components/Modal/DeleteConfirmModal';
import ShareModal from '@components/Modal/ShareModal';
import ErrorPage from '@components/ErrorPage/ErrorPage';
import EditIcon from '@assets/icons/edit-outline.svg?react';
import ShareIcon from '@assets/icons/share-outline.svg?react';
import MoreVertIcon from '@assets/icons/more-vert.svg?react';
import ChevronRightIcon from '@assets/icons/chevron-right.svg?react';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';
import { formatDateDot } from '@utils/date';
import { formatCardRegion } from '@utils/region';

const MINI_MAP_ZOOM = 13;

interface DayMapMarker {
  dayNumber: number;
  position: { lat: number; lng: number };
  photoUrl: string;
  label: string;
}

export default function TravelPage() {
  const navigate = useNavigate();
  const { travelId } = useParams<{ travelId: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // API Hooks
  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    status: travelStatus,
    request: fetchTravel,
  } = useApi(travelService.getTravel);

  const { request: deleteTravel } = useApi(travelService.deleteTravel);

  const { data: sharedUrlData, request: fetchSharedUrl } = useApi(
    travelService.getSharedUrl
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      fetchTravel(Number(travelId), token);
    }
  }, [travelId, fetchTravel]);

  // 일차별로 좌표가 있는 첫 사진을 미니 지도 마커로 사용
  const dayMarkers = useMemo<DayMapMarker[]>(() => {
    if (!travel) return [];
    return travel.days
      .map(day => {
        const locatedPhoto = (day.photos || []).find(
          photo =>
            photo.url &&
            typeof photo.latitude === 'number' &&
            typeof photo.longitude === 'number'
        );
        if (!locatedPhoto) return null;
        return {
          dayNumber: day.dayNumber,
          position: {
            lat: locatedPhoto.latitude as number,
            lng: locatedPhoto.longitude as number,
          },
          photoUrl: locatedPhoto.url as string,
          label: day.dayRegion
            ? formatCardRegion(day.dayRegion)
            : `${day.dayNumber}일차`,
        };
      })
      .filter((marker): marker is DayMapMarker => marker !== null);
  }, [travel]);

  const mapCenter = useMemo(() => {
    if (dayMarkers.length === 0) return undefined;
    const latSum = dayMarkers.reduce(
      (sum, marker) => sum + marker.position.lat,
      0
    );
    const lngSum = dayMarkers.reduce(
      (sum, marker) => sum + marker.position.lng,
      0
    );
    return {
      lat: latSum / dayMarkers.length,
      lng: lngSum / dayMarkers.length,
    };
  }, [dayMarkers]);

  // 마커가 2개 이상이면 전체를 담도록 지도를 확대/축소
  const mapBounds = useMemo<MapBounds | undefined>(() => {
    if (dayMarkers.length < 2) return undefined;
    const latitudes = dayMarkers.map(marker => marker.position.lat);
    const longitudes = dayMarkers.map(marker => marker.position.lng);
    return {
      south: Math.min(...latitudes),
      north: Math.max(...latitudes),
      west: Math.min(...longitudes),
      east: Math.max(...longitudes),
    };
  }, [dayMarkers]);

  if (travelLoading)
    return (
      <div className={classes.page}>
        <p className={classes.stateText}>불러오는 중...</p>
      </div>
    );
  if (travelError)
    return <ErrorPage status={travelStatus} message={travelError} />;
  if (!travel)
    return (
      <div className={classes.page}>
        <p className={classes.stateText}>여행 데이터를 찾을 수 없습니다.</p>
      </div>
    );

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      await deleteTravel(Number(travelId), token);
      navigate('/my-travel', {
        viewTransition: true,
        state: { forward: true },
      }); // Go back to list after delete
    }
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    navigate('/edit-travel', {
      viewTransition: true,
      state: {
        travel: { travelId: Number(travelId) },
        forward: true,
      },
    });
  };

  const handleShareClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      await fetchSharedUrl(Number(travelId), token);
      setShowShareModal(true);
    }
  };

  const handleCloseShareModal = () => setShowShareModal(false);

  const handleDayClick = (dayNumber: number) => {
    navigate(`./${dayNumber}`, {
      viewTransition: true,
      state: { forward: true },
    });
  };

  const handleBackClick = () => navigate(-1);

  return (
    <div className={classes.page}>
      <AppBar
        title="여행 상세"
        onBack={handleBackClick}
        rightAction={
          <div className={classes.headerActions}>
            <button
              type="button"
              className={classes.iconButton}
              onClick={handleEditClick}
              aria-label="여행 수정"
            >
              <EditIcon className={classes.editIcon} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={classes.iconButton}
              onClick={handleShareClick}
              aria-label="여행 공유"
            >
              <ShareIcon className={classes.shareIcon} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={classes.iconButton}
              onClick={handleDeleteClick}
              aria-label="여행 삭제"
            >
              <MoreVertIcon className={classes.moreIcon} aria-hidden="true" />
            </button>
          </div>
        }
      />

      <main className={classes.content}>
        <section className={classes.miniMap} aria-label="여행지 지도">
          {dayMarkers.length > 0 ? (
            <BackgroundMap
              position={mapCenter}
              bounds={mapBounds}
              zoom={MINI_MAP_ZOOM}
              draggable={false}
            >
              {dayMarkers.map(marker => (
                <CustomOverlay
                  key={marker.dayNumber}
                  position={marker.position}
                >
                  <MiniMapMarker
                    photoUrl={marker.photoUrl}
                    label={marker.label}
                    onClick={() => handleDayClick(marker.dayNumber)}
                  />
                </CustomOverlay>
              ))}
            </BackgroundMap>
          ) : (
            <div className={classes.miniMapEmpty}>
              지도에 표시할 사진이 없습니다
            </div>
          )}
        </section>

        <section className={classes.tripMeta}>
          <h2 className={classes.title}>{travel.title}</h2>
          <div className={classes.metaRow}>
            <span>
              {formatDateDot(travel.startDate)} ~{' '}
              {formatDateDot(travel.endDate)}
            </span>
            {travel.trvRegion && (
              <>
                <span className={classes.metaDot} aria-hidden="true" />
                <span>{formatCardRegion(travel.trvRegion)}</span>
              </>
            )}
          </div>
        </section>

        <div className={classes.dayList}>
          {travel.days.map((day, dayIndex) => {
            const photos = (day.photos || []).filter(photo => photo.url);
            return (
              <div key={day.dayId} className={classes.daySection}>
                {dayIndex > 0 && <div className={classes.separator} />}
                <Link
                  to={`./${day.dayNumber}`}
                  className={classes.dayLink}
                  state={{ forward: true }}
                  viewTransition
                >
                  <div className={classes.dayInfo}>
                    <span className={classes.dayNumber}>
                      {day.dayNumber}일차
                    </span>
                    <span className={classes.dayDate}>
                      {formatDateDot(day.date)}
                    </span>
                    {day.dayRegion && (
                      <span className={classes.dayRegion}>
                        {formatCardRegion(day.dayRegion)}
                      </span>
                    )}
                  </div>
                  <span className={classes.chevron}>
                    <ChevronRightIcon
                      className={classes.chevronIcon}
                      aria-hidden="true"
                    />
                  </span>
                </Link>

                {photos.length > 0 && (
                  <div className={classes.photoStrip}>
                    {photos.map((photo, photoIndex) => {
                      const image = (
                        <img
                          src={photo.url}
                          alt={`${day.dayNumber}일차 사진 ${photoIndex + 1}`}
                          loading="lazy"
                          draggable={false}
                        />
                      );
                      return photo.photoId ? (
                        <Link
                          key={`${photo.photoId}-${photoIndex}`}
                          to={`/travel/${travelId}/photos/${photo.photoId}/travel-photo-comment`}
                          className={classes.photoCard}
                          state={{ forward: true }}
                          viewTransition
                        >
                          {image}
                        </Link>
                      ) : (
                        <div
                          key={`photo-${photoIndex}`}
                          className={classes.photoCard}
                        >
                          {image}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {showDeleteModal && (
        <DeleteConfirmModal
          message="여행을 정말로 삭제하시겠습니까?"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showShareModal && sharedUrlData && (
        <ShareModal
          shareUrl={sharedUrlData.data.shareUrl}
          onCancel={handleCloseShareModal}
        />
      )}
    </div>
  );
}
