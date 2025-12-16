import classes from '../Buttons.module.css';
import shareClasses from './ShareButton.module.css'
import shareIcon from '../../../assets/icons/share.svg';

type ShareButtonProps = {
  onClick?: () => void;
};

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button type="button" className={shareClasses.iconWrapper} onClick={onClick}>
      <img src={shareIcon} alt="Share" className={classes.smallIcon} />
    </button>
  );
}
