import type { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';
export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={classes.button} type="button" {...props}></button>;
}
