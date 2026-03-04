import { useLocation, useNavigate } from 'react-router-dom';
import classes from './SelectThumbnailPhotoPage.module.css';
import type { DatedPhotoData } from 'src/types/photo.type';
import FullPhotoLayout from '@components/FullPhotoLayout/FullPhotoLayout';
import GrayBackButton from '@components/Buttons/BackButton/GrayBackButton/GrayBackButton';
import Button from '@components/Buttons/Button/Button';
import { useTravel } from '@hooks/travel';
export default function SelectThumbnailPhotoPage() {
  const { setTravel } = useTravel();
  const photo: DatedPhotoData = useLocation().state;
  const navigate = useNavigate();
  const handleClickSetThumbnailButton = () => {
    setTravel(travel => {
      return { ...travel, thumbnailPhotoId: photo.id };
    });
    navigate(-1);
  };
  return (
    <FullPhotoLayout photo={photo} imageWidthDefaultPercent={100}>
      <header className={classes.header}>
        <GrayBackButton
          onClick={() => navigate(-1)}
          className={classes.backButton}
        />
      </header>
      <footer className={classes.footer}>
        <Button
          className={classes.button}
          onClick={handleClickSetThumbnailButton}
        >
          대표 사진으로 설정
        </Button>
      </footer>
    </FullPhotoLayout>
  );
}