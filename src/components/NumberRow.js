import React from 'react';
import clsx from 'clsx';
import OpenLockIcon from '@material-ui/icons/LockOpenOutlined';
import LockIcon from '@material-ui/icons/Lock';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = (color, lockSection) => makeStyles((theme) => ({
  row: {
    backgroundColor: theme.palette[color].main,
    borderRadius: theme.spacing(),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(),
  },
  number: {
    cursor: 'pointer',
    padding: theme.spacing(),
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    position: 'relative',
    //width: `calc((100% / ${lockSection ? '2' : '10'}) - ${theme.spacing(2)}px)`,
    width: 56,
  },
  numberContent: {
    float: 'left',
    textAlign: 'center',
    width: '100%',
  },
  liveNumber: {
    backgroundColor: theme.palette[color].light,
    color: theme.palette[color].main,
  },
  disabledNumber: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  disabledNumberContent: {
    textDecoration: 'line-through',
  },
  x: {
    fontWeight: 'bold',
    color: 'black',
  },
  openLock: {
    fontSize: theme.typography.fontSize,
    marginBottom: -4,
    transform: 'rotate(45deg)',
  },
  lock: {
    fontSize: theme.typography.fontSize,
    marginBottom: -4,
  },
  square: {
    borderRadius: theme.spacing(),
  },
  circle: {
    borderRadius: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(),
    },
  },
}));

function FreeSection({ color, onClick, reverse, row }) {
  const classes = useStyles(color)();
  const [marks, disabled] = row;

  return (
    <div className={classes.row}>
      <Grid container justifyContent='space-around'>
        {marks.map((selected, i) => {

          if (i < 10) {
            return (
              <Grid 
                item
                key={color + i}
                className={clsx(classes.number, classes.square, disabled[i] && !selected ? classes.disabledNumber : classes.liveNumber )}
                onClick={() => onClick(color, i)}
              >
                <div className={clsx(classes.numberContent, disabled[i] && !selected && classes.disabledNumberContent)}>
                  {selected 
                    ? <span className={classes.x}>X</span>
                    : reverse
                      ? marks.length - i
                      : i + 2
                  }
                </div>
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
    </div>
  );
}

function LockSection({ color, onClick, reverse, row }) {
  const classes = useStyles(color, true)();
  const [marks, disabled] = row;
  const fiveXLocked = marks.filter(value => value).length < 5;

  return (
    <div className={classes.row}>
      <Grid container justifyContent='space-around'>
        {marks.map((selected, i) => {
          const isLock = i + 1 === marks.length;

          if (i > 9) {
            return (
              <Grid 
                item
                key={color + i}
                className={clsx(classes.number, classes.square, disabled[i] && !selected ? classes.disabledNumber : classes.liveNumber )}
                onClick={() => onClick(color, i, isLock)}
              >
                <div className={clsx(
                  classes.numberContent,
                  !fiveXLocked && disabled[i] && !selected && classes.disabledNumberContent)}>
                  {selected 
                    ? <span className={classes.x}>X</span>
                    : isLock
                      ? disabled[i]
                        ? <LockIcon className={classes.lock} />
                        : <OpenLockIcon className={classes.openLock} />
                      : reverse
                        ? marks.length - i
                        : i + 2
                  }
                </div>
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
    </div>
  );
}

export {
  FreeSection,
  LockSection,
};
