import classes from '../Buttons.module.css';
import EditClasses from './EditButton.module.css'
import editIcon from '../../../assets/icons/edit.svg';

export default function EditButton() {
  return (
    <button className={EditClasses.iconWrapper}>
      <img src={editIcon} alt="Edit" className={classes.smallIcon} />
    </button>
  );
}
