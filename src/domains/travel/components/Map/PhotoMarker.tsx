import { CustomOverlay } from 'react-naver-maps';
import classes from './PhotoMarker.module.css';

type LatLng = { lat: number; lng: number };

interface PhotoMarkerProps {
  photoUrl: string;
  position: LatLng;
  onClick?: () => void;
}

export default function PhotoMarker({
  photoUrl,
  position,
  onClick,
}: PhotoMarkerProps) {
  return (
    <CustomOverlay position={position}>
      <img
        src={photoUrl}
        className={classes.photoMarker}
        onClick={onClick}
        alt=""
      />
    </CustomOverlay>
  );
}
