import React from 'react';
import LockIcon from '@material-ui/icons/LockOpenOutlined';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { blue, green, red, yellow } from '@material-ui/core/colors';
const colors = { blue, green, red, yellow };

const useStyles = (color) => makeStyles((theme) => ({
  row: {
    backgroundColor: color[700],
    borderRadius: 4,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(),
  },
  number: {
    backgroundColor: color[100],
    color: color[700],
    borderRadius: 4,
    cursor: 'pointer',
    padding: theme.spacing(),
    position: 'relative',
    width: `calc((100% / 12) - ${theme.spacing(2)})`,
    '&::before': {
      content: "''",
      float: 'left',
      paddingTop: '100%',
    }
  },
  numberContent: {
    float: 'left',
    fontSize: '3vw',
    // fontSize: '2rem',
    textAlign: 'center',
    width: '100%',
  },
  x: {
    fontWeight: 'bold',
    color: 'black',
  },
  lock: {
    fontSize: '3vw',
    // fontSize: '2rem',
    marginBottom: -4,
    transform: 'rotate(45deg)',
  },
}));

function NumberRow({ color, onClick, reverse, row }) {
  const classes = useStyles(colors[color])();

  return (
    <Grid container spacing={2} justify='space-around' className={classes.row}>
      {row.map((selected, i) => (
        <Grid item key={color + i} className={classes.number} onClick={() => onClick(color, i)}>
          <div className={classes.numberContent}>
            {selected 
              ? <span className={classes.x}>X</span>
              : i + 1 === row.length
                ? <LockIcon className={classes.lock} />
                : reverse
                  ? row.length - i
                  : i + 2
            }
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default NumberRow;
