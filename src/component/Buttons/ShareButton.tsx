import classes from './Buttons.module.css';
import shareIcon from '../../assets/icons/share.svg';

type ShareButtonProps = {
  onClick?: () => void;
};

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button type="button" className={classes.skyIconWrapper} onClick={onClick}>
      <img src={shareIcon} alt="Share" className={classes.icon} />
    </button>
  );
}
