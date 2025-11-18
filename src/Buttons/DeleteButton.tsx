import classes from './Buttons.module.css';
import deleteIcon from '../assets/icons/delete.svg';

export default function DeleteButton() {
  return (
    <button className={classes.pinkIconWrapper}>
      <img src={deleteIcon} alt="Delete" className={classes.icon} />
    </button>
  );
}
