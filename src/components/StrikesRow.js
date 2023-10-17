import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    marginBottom: theme.spacing(2),
  },
  scoreContainer: {
    marginRight: theme.spacing(2),
  },
  score: {
    backgroundColor: 'white',
    border: `2px solid ${theme.palette.grey.main}`,
    borderRadius: theme.spacing(),
    paddingLeft: theme.spacing()/2,
    paddingRight: theme.spacing()/2,
    fontSize: 18,
  },
  scoreTop: {
    borderBottom: `1px solid ${theme.palette.grey.main}`,
    textAlign: 'center',
    padding: theme.spacing(0.75),
  },
  scoreBottom: {
    padding: theme.spacing()/2,
    textAlign: 'center',
  },
  strike: {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey.main}`,
    borderRadius: theme.spacing()/2,
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: `0 ${theme.spacing(0.75)}px`,
  },
  strikeEmpty: {
    color: 'White',
  },
  strikesContainer: { },
  strikesLabel: {
    fontSize: 18,
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
    <Grid container justifyContent='space-between' alignItems='center' wrap='nowrap' className={classes.row}>
      <Grid item className={classes.scoreContainer}>
        <Grid container spacing={1} justifyContent='space-between' wrap='nowrap'>
          <Grid item >
            <div className={classes.score}>
              <div className={classes.scoreTop} style={{ fontWeight: 'bold' }}>X</div>
              <div className={classes.scoreBottom}>Points</div>
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
        <Grid container spacing={1} justifyContent='space-around' alignItems='center' wrap='nowrap'>
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