import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  const { blue, green, grey, red, yellow } = theme.palette;
  return ({
    block: {
      backgroundColor: 'white',
      border: `0.05em solid ${grey.dark}`,
      borderRadius: theme.spacing(2),
      cursor: 'pointer',
      flexGrow: 1,
      flexShrink: 0,
      fontSize: '3vw',
      padding: theme.spacing(1),
      textAlign: 'center',
      width: '12%'
    },
    blockRed: {
      borderColor: red.main,
      backgroundColor: red.light,
      color: red.light,
    },
    blockYellow: {
      borderColor: yellow.main,
      backgroundColor: yellow.light,
      color: yellow.light,
    },
    blockGreen: {
      borderColor: green.main,
      backgroundColor: green.light,
      color: green.light,
    },
    blockBlue: {
      borderColor: blue.main,
      backgroundColor: blue.light,
      color: blue.light,
    },
    blockWhite: {
      color: 'white',
    },
    blackText: {
      color: 'black',
    },
    mathSymbol: {
      fontSize: '3vw',
      textAlign: 'center',
      width: '4%'
    },
    totals: {
      padding: theme.spacing(),
      paddingLeft: 0,
      width: '7.5%',
      fontSize: '2vw',
    },
  });
});


function ScoreRow(props) {
  const classes = useStyles();
  const { 
    blueScore,
    greenScore,
    redScore,
    strikesScore,
    yellowScore,
    showBlue, 
    showGreen, 
    showRed, 
    showYellow,
    showStrikes,
    showFinal,
    revealScore,
  } = props;

  const totalScore = redScore + yellowScore + greenScore + blueScore - strikesScore;

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item className={classes.totals}>
        Totals
      </Grid>
      <Grid item
        className={clsx(
          classes.block,
          classes.blockRed,
          showRed && classes.blackText
        )}
        onClick={() => revealScore('showRed')}
      >
        {redScore}
      </Grid>
      <Grid item className={classes.mathSymbol}>+</Grid>
      <Grid item
        className={clsx(
          classes.block,
          classes.blockYellow,
          showYellow && classes.blackText
        )}
        onClick={() => revealScore('showYellow')}
      >
        {yellowScore}
      </Grid>
      <Grid item className={classes.mathSymbol}>+</Grid>
      <Grid item
        className={clsx(
          classes.block,
          classes.blockGreen,
          showGreen && classes.blackText
        )}
        onClick={() => revealScore('showGreen')}
      > 
        {greenScore}
      </Grid>
      <Grid item className={classes.mathSymbol}>+</Grid>
      <Grid item
        className={clsx(
          classes.block,
          classes.blockBlue,
          showBlue && classes.blackText,
        )}
        onClick={() => revealScore('showBlue')}
      >
        {blueScore}
      </Grid>
      <Grid item className={classes.mathSymbol}>-</Grid>
      <Grid item 
        className={clsx(
          classes.block,
          classes.blockWhite,
          showStrikes && classes.blackText,
        )}
        onClick={() => revealScore('showStrikes')}
      >
        {strikesScore}
      </Grid>
      <Grid item className={classes.mathSymbol}>=</Grid>
      <Grid item 
        className={clsx(
          classes.block,
          classes.blockWhite,
          showFinal && classes.blackText
        )}
        onClick={() => revealScore('showFinal')}
      >
        {totalScore}
      </Grid>
    </Grid>
  );
}

export default ScoreRow;
