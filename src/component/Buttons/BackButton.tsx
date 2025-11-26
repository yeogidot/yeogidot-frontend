import classes from './Buttons.module.css';
import backIcon from '../../assets/icons/back-white.svg';

type BackButtonProps = {
  onClick?: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button 
      type="button"
      className={`${classes.grayIconWrapper} ${classes.mapBackButton}`}
      onClick={onClick}
    >
      <img src={backIcon} alt="Back" className={classes.icon} />
    </button>
  );
}
