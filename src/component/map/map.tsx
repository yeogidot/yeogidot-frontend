import { type ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import classes from './map.module.css';

type MapProps = {
  className?: string;
  center?: LatLngExpression;
  zoom?: number;
  scrollWheelZoom?: boolean;
  children?: ReactNode;
};

const DEFAULT_CENTER: LatLngExpression = [35.1796, 129.0756];
const DEFAULT_ZOOM = 15;

export default function Map({
  className,
  center = DEFAULT_CENTER,
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
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
