import { useRef, useState, type ReactElement } from 'react';
import type { DatedPhotoData } from 'src/types/photo.type';
import classes from './FullPhotoLayout.module.css';
import { getCenter, getDiff, detectZoom } from '@utils/zoom';
interface Props {
  photo: DatedPhotoData;
  children?: ReactElement[] | ReactElement;
  imageWidthDefaultPercent?: number;
}

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
  const [imageWidthPercent, setImageWidthPercent] = useState(
    imageWidthDefaultPercent
  );

  const scrollToScailedCenter = (
    center: { x: number; y: number } | null,
    container: HTMLDivElement | null,
    ratio: number,
    viewportHeight: number
  ) => {
    if (center === null || container === null) {
      return;
    }
    const { x, y } = center;
    const scaledX = x * ratio;
    const scaledY = y * ratio;
    container.scrollTo(scaledX - x, scaledY - (viewportHeight - y));
  };

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
      if (
        detectZoom(previousDiff, nowDiff) === 'ZOOM IN' &&
        imageWidthPercent < 300
      ) {
        setImageWidthPercent(widthPercent =>
          widthPercent < 300 ? widthPercent * 1.01 : 300
        );
        scrollToScailedCenter(
          center,
          containerRef.current,
          imageWidthPercent * 0.01,
          window.innerHeight
        );
      }
      if (
        detectZoom(previousDiff, nowDiff) === 'ZOOM OUT' &&
        imageWidthPercent > 100
      ) {
        setImageWidthPercent(widthPercent =>
          widthPercent > 100 ? widthPercent * 0.99 : 100
        );
        scrollToScailedCenter(
          center,
          containerRef.current,
          imageWidthPercent * 0.01,
          window.innerHeight
        );
      }
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
