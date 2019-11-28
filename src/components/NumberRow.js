import React from 'react';
import clsx from 'clsx';
import LockIcon from '@material-ui/icons/LockOpenOutlined';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { blue, green, red, yellow } from '@material-ui/core/colors';

const colors = { blue, green, red, yellow };

const useStyles = (color, lockSection) => makeStyles((theme) => ({
  row: {
    backgroundColor: color[700],
    borderRadius: 4,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(),
  },
  number: {
    backgroundColor: color[100],
    color: color[700],
    cursor: 'pointer',
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: 'relative',
    width: `calc((100% / ${lockSection ? '2' : '10'}) - ${theme.spacing(2)})`,
  },
  numberContent: {
    float: 'left',
    fontSize: '3vw',
    textAlign: 'center',
    width: '100%',
  },
  x: {
    fontWeight: 'bold',
    color: 'black',
  },
  lock: {
    fontSize: '3vw',
    marginBottom: -4,
    transform: 'rotate(45deg)',
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
  const classes = useStyles(colors[color])();

  return (
    <div className={classes.row}>
      <Grid container justify='space-around'>
        {row.map((selected, i) => {
          const isLock = i + 1 === row.length;
          if (i < 10) {
            return (
              <Grid 
                item
                key={color + i}
                className={clsx(classes.number, isLock ? classes.circle : classes.square )}
                onClick={() => onClick(color, i)}
              >
                <div className={classes.numberContent}>
                  {selected 
                    ? <span className={classes.x}>X</span>
                    : isLock
                      ? <LockIcon className={classes.lock} />
                      : reverse
                        ? row.length - i
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
  const classes = useStyles(colors[color], true)();

  return (
    <div className={classes.row}>
      <Grid container justify='space-around'>
        {row.map((selected, i) => {
          const isLock = i + 1 === row.length;
          if (i > 9) {
            return (
              <Grid 
                item
                key={color + i}
                className={clsx(classes.number, isLock ? classes.circle : classes.square )}
                onClick={() => onClick(color, i)}
              >
                <div className={classes.numberContent}>
                  {selected 
                    ? <span className={classes.x}>X</span>
                    : isLock
                      ? <LockIcon className={classes.lock} />
                      : reverse
                        ? row.length - i
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
