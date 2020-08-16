
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  diceWrapper: {
   border: '0.03em solid black',
    borderRadius: '0.2em',
    fontSize: '7vw',
    height: '0.91em',
    cursor: 'pointer',
    width: '0.91em',
  },
  dice: {
    borderRadius: '0.2em',
    height: '0.88em',
    width: '0.88em',
  },
  disabledDiceWrapper: {
    backgroundColor: theme.palette.grey.main,
    color: 'black',
  },
  disabledDice: {
    position: 'relative',
    top: '0.45em',
    left: '0.1em',
  },
  // diceWrapper: {
  //   border: '1px solid black',
  //   cursor: 'pointer',
  //   fontSize: '2.5em',
  //   borderRadius: '6px',
  //   paddingLeft: '0.075em',
  //   paddingRight: '0.075em',
  // },
  // dice: {
  //   borderRadius: '4px',
  //   margin: 'auto',
  // },
  // disabledDiceWrapper: {
  //   backgroundColor: theme.palette.grey.main,
  //   color: 'black',
  // },
  // disabledDice: {
  //   position: 'relative',
  // },
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