export const detectZoom = (
  previousDiff: number | null,
  nowDiff: number | null,
  threshold = 1
) => {
  if (
    previousDiff === null ||
    nowDiff === null ||
    Math.abs(nowDiff - previousDiff) <= threshold
  ) {
    return null;
  }
  if (nowDiff > previousDiff) {
    return 'ZOOM IN';
  }
  if (nowDiff < previousDiff) {
    return 'ZOOM OUT';
  }
};

export const getDiff = (eventCache: React.PointerEvent[]) => {
  if (eventCache.length < 2) {
    return null;
  }
  const [a, b] = eventCache;
  return Math.sqrt((a.clientX - b.clientX) ** 2 + (a.clientY - b.clientY) ** 2);
};
export const getCenter = (eventCache: React.PointerEvent[]) => {
  if (eventCache.length < 2) {
    return null;
  }
  const [a, b] = eventCache;
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2,
  };
};

export const scrollToScailedCenter = (
  center: { x: number; y: number } | null,
  container: HTMLDivElement | null,
  scale: number
) => {
  if (center === null || container === null || scale === 1) {
    return;
  }

  const { x, y } = center;

  const contentX = container.scrollLeft + x;
  const contentY = container.scrollTop + y;

  const newScrollLeft = contentX * scale - x;
  const newScrollTop = contentY * scale - y;
  container.scrollTo(newScrollLeft, newScrollTop);
};
