import { type ReactNode, useEffect } from 'react';
// 1. ZoomControl을 import에 추가합니다.
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import classes from './Map.module.css';

type MapProps = {
  className?: string;
  position?: LatLngExpression;
  zoom?: number;
  scrollWheelZoom?: boolean;
  children?: ReactNode;
};

const DEFAULT_CENTER: LatLngExpression = [35.1796, 129.0756];
const DEFAULT_ZOOM = 15;

// Component to handle map view changes dynamically
function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map({
  className,
  position = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  scrollWheelZoom = false,
  children,
}: MapProps) {
  const mapClassName = className
    ? `${classes.map} ${className}`.trim()
    : classes.map;

  return (
    <MapContainer
      className={mapClassName}
      center={position}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={false} // 2. 기본 줌 컨트롤을 끕니다.
    >
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 3. ZoomControl 컴포넌트를 추가하고 위치를 지정합니다. */}
      {/* position 옵션: 'topright', 'bottomright', 'bottomleft', 'topleft' */}
      <ZoomControl position="topright" />

      {children}
    </MapContainer>
  );
}
