import classes from './map.module.css';
import mapImg from '../assets/images/map.png';

export default function BackgroundMap() {
  return (
    <img src={mapImg} className={classes.map} />
  );
}
