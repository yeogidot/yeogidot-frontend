import { useLocation, useNavigate } from 'react-router-dom';
import classes from './NewTravelPhotoPage.module.css';
import type { DatedPhotoData } from 'src/types/photo.type';
import WarningIcon from '@assets/icons/warning.svg';
import FullPhotoLayout from '@components/FullPhotoLayout/FullPhotoLayout';
import GrayBackButton from '@components/Buttons/BackButton/GrayBackButton/GrayBackButton';
import { convertISOToKorean } from '@utils/date';
import CircularIconButton from '@components/CircularIconButton/CircularIconButton';
import CalendarIcon from '@assets/icons/datetime-white.svg';
import BinIcon from '@assets/icons/trash-can.svg';
import { useState } from 'react';
import DatetimeModal from '@components/Modal/DatetimeModal/DatetimeModal';
import DeleteConfirmModal from '@components/Modal/DeleteConfirmModal';

export default function FullPhotoPage() {
  const [datetimeModalState, setDatetimeModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const photo: DatedPhotoData = useLocation().state;
  const navigate = useNavigate();
  return (
    <FullPhotoLayout photo={photo} imageWidthDefaultPercent={100}>
      <header className={classes.header}>
        <GrayBackButton
          onClick={() => navigate(-1)}
          className={classes.backButton}
        />
        <div className={classes.photoInfo}>
          {photo.date ? (
            <h2>{convertISOToKorean(photo.date)}</h2>
          ) : (
            <h2>날짜 정보 없음</h2>
          )}
          {photo.warning && (
            <h2 className={classes.warning}>
              <img src={WarningIcon} alt="경고 아이콘" /> 위치 정보 없음
            </h2>
          )}
        </div>
      </header>
      <footer className={classes.footer}>
        <CircularIconButton
          icon={CalendarIcon}
          onClick={() => {
            setDatetimeModalState(true);
          }}
        />
        <CircularIconButton
          icon={BinIcon}
          onClick={() => {
            setDeleteModalState(true);
          }}
        />
      </footer>
      {datetimeModalState ? (
        <DatetimeModal
          currentDate={photo.date ? photo.date : null}
          onCancel={() => setDatetimeModalState(false)}
        />
      ) : (
        <></>
      )}
      {deleteModalState ? (
        <DeleteConfirmModal
          message={'사진을 삭제하시겠습니까?'}
          onConfirm={() => undefined}
          onCancel={() => setDeleteModalState(false)}
        />
      ) : (
        <></>
      )}
    </FullPhotoLayout>
  );
}
