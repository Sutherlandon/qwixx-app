import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  row: {
    marginBottom: theme.spacing(2),
  },
  scoreContainer: {
    marginRight: theme.spacing(2),
  },
  score: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 6,
    fontSize:'1.5vw',
    paddingLeft: 4,
    paddingRight: 4,
  },
  scoreTop: {
    borderBottom: `1px solid ${grey[500]}`,
    textAlign: 'center',
    padding: 4,
  },
  scoreBottom: {
    padding: 4,
    textAlign: 'center',
  },
  strike: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '2.5vw',
    padding: 4,
  },
  strikeEmpty: {
    color: 'White',
  },
  strikesContainer: { },
  strikesLabel: {
    fontSize: '2vw',
    marginBottom: theme.spacing(),
    textAlign: 'center',
  },
  strikesLabelX: {
    fontWeight: 'bold',
    color: 'red',
  },
}));


function StrikesRow(props) {
  const { onClick, scoring, strikes } = props;
  const classes = useStyles();

  return (
    <Grid container justify='space-between' alignItems='center' wrap='nowrap' className={classes.row}>
      <Grid item className={classes.scoreContainer}>
        <Grid container spacing={1} justify='space-between' wrap='nowrap'>
          <Grid item >
            <div className={classes.score}>
              <div className={classes.scoreTop}>X</div>
              <div className={classes.scoreBottom}>points</div>
            </div>
          </Grid>
          {scoring
            .filter(score => score > 0) // skip the first one
            .map((score, i) => (
              <Grid item key={score}>
                <div className={classes.score}>
                  <div className={classes.scoreTop}>{i + 1}x</div>
                  <div className={classes.scoreBottom}>{score}</div>
                </div>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item className={classes.strikesContainer}>
        <div className={classes.strikesLabel}>
          <span className={classes.strikesLabelX}>X</span> = -5
        </div>
        <Grid container spacing={1} justify='space-around' alignItems='center' wrap='nowrap'>
          {strikes.map((strike, i) => (
            <Grid item
              key={i}
              onClick={() => onClick(i)}
            >
              <div className={clsx(classes.strike, !strike ? classes.strikeEmpty : null)}>
                X
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StrikesRow;