import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface PhotoMarkerProps {
  photoUrl: string;
  position: [number, number];
}

export default function PhotoMarker({ photoUrl, position }: PhotoMarkerProps) {
  const icon = L.divIcon({
    html: `<img src="${photoUrl}" style="
      width: 50px;
      height: 50px;
      object-fit: cover;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    " />`,
    className: '',
    iconSize: [50, 50],
    iconAnchor: [25, 25], // 마커 중앙 기준
  });

  return <Marker position={position} icon={icon} />;
}
