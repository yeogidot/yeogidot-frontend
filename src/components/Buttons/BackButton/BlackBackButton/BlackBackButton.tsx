import classes from './BlackBackButton.module.css';
import backIcon from '../../../../assets/icons/back-black.svg';

type BackButtonProps = {
  onClick?: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button 
      type="button"
      className={classes.icon}
      onClick={onClick}
    >
      <img src={backIcon} alt="Back" />
    </button>
  );
}
