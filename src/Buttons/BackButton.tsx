import classes from './Buttons.module.css';
import backIcon from '../assets/icons/back-white.svg';

export default function BackButton() {
  return (
    <button className={`${classes.grayIconWrapper} ${classes.mapBackButton}`}>
      <img src={backIcon} alt="Back" className={classes.icon} />
    </button>
  );
}
