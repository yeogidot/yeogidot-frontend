import classes from '../Buttons.module.css';
import deleteClasses from './DeleteButton.module.css';
import deleteIcon from '../../../assets/icons/delete.svg';

type DeleteButtonProps = {
  onClick?: () => void;
};

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button type="button" className={deleteClasses.iconWrapper} onClick={onClick}>
      <img src={deleteIcon} alt="Delete" className={classes.smallIcon} />
    </button>
  );
}
