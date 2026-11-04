import classes from './MapPhotoMarker.module.css';

interface MapPhotoMarkerProps {
  photoUrl: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function MapPhotoMarker({
  photoUrl,
  selected = false,
  onClick,
}: MapPhotoMarkerProps) {
  const selectedClass = selected ? classes.selected : '';

  return (
    <div className={classes.marker}>
      <button
        type="button"
        className={`${classes.bubble} ${selectedClass}`.trim()}
        onClick={onClick}
        aria-label="사진 선택"
        aria-pressed={selected}
      >
        <img
          src={photoUrl}
          className={`${classes.image} ${selectedClass}`.trim()}
          alt=""
        />
      </button>
      <span className={`${classes.tail} ${selectedClass}`.trim()} />
    </div>
  );
}
