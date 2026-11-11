import classes from './MiniMapMarker.module.css';

interface MiniMapMarkerProps {
  photoUrl: string;
  label: string;
  onClick?: () => void;
}

export default function MiniMapMarker({
  photoUrl,
  label,
  onClick,
}: MiniMapMarkerProps) {
  return (
    <div className={classes.marker}>
      <button
        type="button"
        className={classes.bubble}
        onClick={onClick}
        aria-label={label}
      >
        <img src={photoUrl} className={classes.image} alt="" />
      </button>
      <span className={classes.label}>{label}</span>
    </div>
  );
}
