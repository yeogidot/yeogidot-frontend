import type { ButtonHTMLAttributes } from 'react';
import classes from '../Buttons.module.css';
import EditClasses from './EditButton.module.css';
import editIcon from '../../../assets/icons/edit.svg';

type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <button className={EditClasses.iconWrapper} onClick={onClick} type="button">
      <img src={editIcon} alt="Edit" className={classes.smallIcon} />
    </button>
  );
}
