import classes from './Buttons.module.css';
import deleteIcon from '../../assets/icons/delete.svg';

type DeleteButtonProps = {
  onClick?: () => void;
};

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button type="button" className={classes.pinkIconWrapper} onClick={onClick}>
      <img src={deleteIcon} alt="Delete" className={classes.icon} />
    </button>
  );
}
