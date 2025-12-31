import { useLocation, useNavigate } from 'react-router-dom';
import classes from './FullPhotoPage.module.css';
import type { DatedPhotoData } from 'src/types/photo.type';
import WhiteBackIcon from '@assets/icons/back-white.svg';
import WarningIcon from '@assets/icons/warning.svg';
import { ISOStringToKoreanDateString } from 'src/utils/date';
import FullPhotoLayout from '@components/FullPhotoLayout/FullPhotoLayout';
export default function FullPhotoPage() {
  const photo: DatedPhotoData = useLocation().state;
  const navigate = useNavigate();
  return (
    <FullPhotoLayout
      photo={photo}
      imageWidthDefaultPercent={100}
    ></FullPhotoLayout>
  );
}
