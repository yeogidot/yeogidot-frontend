import { useRef, useState, type ReactNode } from 'react';
import type { DatedPhotoData } from 'src/types/photo.type';
import classes from './FullPhotoLayout.module.css';
import {
  getCenter,
  getDiff,
  detectZoom,
  scrollToScaledCenter,
} from '@utils/zoom';
interface Props {
  photo: DatedPhotoData;
  children?: ReactNode;
  imageWidthDefaultPercent?: number;
}

const MAX_WIDTH_PERCENT = 300;
const MIN_WIDTH_PERCENT = 100;

export default function FullPhotoLayout({
  photo,
  children,
  imageWidthDefaultPercent = 100,
}: Props) {
  const [_, setPointerStatus] = useState<{
    eventCache: React.PointerEvent[];
    previousDiff: null | number;
  }>({ eventCache: [], previousDiff: null });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageWidthPercentRef = useRef(imageWidthDefaultPercent);
  const [imageWidthPercent, setImageWidthPercent] = useState(
    imageWidthDefaultPercent
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    setPointerStatus(({ eventCache, previousDiff }) => {
      return {
        eventCache: eventCache.length < 2 ? [...eventCache, event] : eventCache,
        previousDiff: previousDiff,
      };
    });
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    setPointerStatus(({ eventCache, previousDiff }) => {
      const nextEventCache = eventCache.map(cachedEvent =>
        event.pointerId === cachedEvent.pointerId ? event : cachedEvent
      );
      const nowDiff = getDiff(nextEventCache);
      const center = getCenter(nextEventCache);

      const prevWidth = imageWidthPercentRef.current;
      let nextWidth = prevWidth;

      if (
        detectZoom(previousDiff, nowDiff) === 'ZOOM IN' &&
        imageWidthPercent < MAX_WIDTH_PERCENT
      ) {
        nextWidth = Math.min(prevWidth * 1.01, MAX_WIDTH_PERCENT);
      }
      if (
        detectZoom(previousDiff, nowDiff) === 'ZOOM OUT' &&
        imageWidthPercent > MIN_WIDTH_PERCENT
      ) {
        nextWidth = Math.max(prevWidth * 0.99, MIN_WIDTH_PERCENT);
      }

      setImageWidthPercent(nextWidth);
      imageWidthPercentRef.current = nextWidth;
      const scale = nextWidth / prevWidth;
      scrollToScaledCenter(center, containerRef.current, scale);

      return {
        eventCache: nextEventCache,
        previousDiff: nowDiff ? nowDiff : previousDiff,
      };
    });
  };
  const handlePointerCancel = (event: React.PointerEvent<HTMLImageElement>) => {
    setPointerStatus(({ eventCache, previousDiff }) => {
      return {
        eventCache: eventCache.filter(
          cachedEvent => cachedEvent.pointerId !== event.pointerId
        ),
        previousDiff: previousDiff,
      };
    });
  };

  return (
    <div className={classes.container} ref={containerRef}>
      {children}
      <img
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerCancel}
        onPointerCancel={handlePointerCancel}
        className={classes.image}
        src={photo.url}
        width={`${imageWidthPercent}%`}
        alt="현재 사진"
      />
    </div>
  );
}
