import { type ReactNode } from 'react';
import { Container as MapDiv, NaverMap } from 'react-naver-maps';
import classes from './Map.module.css';

type LatLng = { lat: number; lng: number };

export type MapBounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};

type MapProps = {
  className?: string;
  position?: LatLng;
  zoom?: number;
  scrollWheelZoom?: boolean;
  onBoundsChanged?: (bounds: MapBounds) => void;
  children?: ReactNode;
};

const DEFAULT_CENTER: LatLng = { lat: 35.1796, lng: 129.0756 };
const DEFAULT_ZOOM = 15;

export default function Map({
  className,
  position = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  scrollWheelZoom = false,
  onBoundsChanged,
  children,
}: MapProps) {
  const mapClassName = className
    ? `${classes.map} ${className}`.trim()
    : classes.map;

  return (
    <MapDiv className={mapClassName}>
      <NaverMap
        center={position}
        zoom={zoom}
        scrollWheel={scrollWheelZoom}
        zoomControl={false}
        onBoundsChanged={bounds => {
          const sw = bounds.getSW();
          const ne = bounds.getNE();
          onBoundsChanged?.({
            south: sw.lat(),
            west: sw.lng(),
            north: ne.lat(),
            east: ne.lng(),
          });
        }}
      >
        {children}
      </NaverMap>
    </MapDiv>
  );
}
