import classes from './Buttons.module.css';
import shareIcon from '../assets/icons/share.svg';

export default function ShareButton() {
  return (
    <button className={classes.skyIconWrapper}>
      <img src={shareIcon} alt="Share" className={classes.icon} />
    </button>
  );
}
