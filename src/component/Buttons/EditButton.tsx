import classes from './Buttons.module.css';
import editIcon from '../../assets/icons/edit.svg';

export default function EditButton() {
  return (
    <button className={classes.skyIconWrapper}>
      <img src={editIcon} alt="Edit" className={classes.icon} />
    </button>
  );
}
