
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  diceWrapper: {
   border: '1px solid black',
    borderRadius: 8,
    height: 58,
    cursor: 'pointer',
    width: 58,
  },
  dice: {
    borderRadius: 8,
    height: 56,
    width: 56,
  },
  disabledDiceWrapper: {
    backgroundColor: theme.palette.grey.main,
    color: 'black',
  },
  disabledDice: {
    position: 'relative',
    top: 30,
    left: 6,
  },
}));

export default function Die({
  className,
  component: Component,
  disabled,
  onClick,
  rolling,
}) {
  const classes = useStyles();
  return (
    <div 
      className={clsx(
        classes.diceWrapper,
        disabled ? classes.disabledDiceWrapper : className,
        { 'rotate-center': rolling && !disabled }
      )}
      onClick={onClick}
    >
      {disabled
        ? <div className={classes.disabledDice}>X</div>
        : !rolling
          ? <Component className={classes.dice} />
          : null
      }
    </div>
  );
}