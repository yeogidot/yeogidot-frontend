import { Marker } from 'react-leaflet';
import L from 'leaflet';
import classes from './PhotoMarker.module.css';
interface PhotoMarkerProps {
  photoUrl: string;
  position: [number, number];
  onClick?: () => void;
}

export default function PhotoMarker({
  photoUrl,
  position,
  onClick,
}: PhotoMarkerProps) {
  const icon = L.icon({
    iconUrl: photoUrl,
    className: classes.photoMarker,
    iconSize: [50, 50],
    iconAnchor: [25, 25], // 마커 중앙 기준
  });
  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: onClick }}
    />
  );
}
