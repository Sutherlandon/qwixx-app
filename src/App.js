import React, { Component } from 'react';
import clsx from 'clsx';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { blue, green, grey, red, yellow } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/LockOpenOutlined';

const numTiles = 12;
const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
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
    width: `calc((100% / ${numTiles}) - ${theme.spacing(2)}px)`,
    '&::before': {
      content: "''",
      float: 'left',
      paddingTop: '100%',
    }
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

const styles = (theme) => ({
  block: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 8,
    flexGrow: 1,
    fontSize: '3vw',
    padding: 8,
    textAlign: 'center',
  },
  blockRed: {
    borderColor: red[700],
    backgroundColor: red[100],
    color: red[100],
  },
  blockYellow: {
    borderColor: yellow[700],
    backgroundColor: yellow[100],
    color: yellow[100],
  },
  blockGreen: {
    borderColor: green[700],
    backgroundColor: green[100],
    color: green[100],
  },
  blockBlue: {
    borderColor: blue[700],
    backgroundColor: blue[100],
    color: blue[100],
  },
  blockWhite: {
    color: 'white',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  row: {
    marginBottom: theme.spacing(2),
  },
  scoreContainer: {
    flexWrap: 'nowrap',
  },
  score: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 8,
    fontSize: '1.5vw',
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
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '7px',
  },
  strikeContainer: {
    minWidth: 128,
  },
  strikeEmpty: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 8,
    cursor: 'pointer',
    padding: '18px 12px',
  },
  strikesLabel: {
    fontSize: '2vw',
    marginBottom: theme.spacing(),
    textAlign: 'center',
  },
  strikesLabelX: {
    fontWeight: 'bold',
    color: 'red',
  },
});

class QuixxScoreCard extends Component {
  state = {
    red: new Array(numTiles).fill(false),
    yellow: new Array(numTiles).fill(false),
    green: new Array(numTiles).fill(false),
    blue: new Array(numTiles).fill(false),
    strikes: new Array(4).fill(false),
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick = (color, index) => {
    const row = [...this.state[color]];

    // set the X and calculate new score
    row[index] = !row[index];
    const numXs = row.filter(value => value).length;
    const score = color === 'strikes' ? numXs * 5 : scoring[numXs];
    
    this.setState({ 
      [color]: row,
      [`${color}Score`]: score,
    });
  }

  render() {
    const { classes } = this.props;
    const { 
      blue,
      blueScore = 0,
      green,
      greenScore = 0,
      red,
      redScore = 0,
      yellow,
      yellowScore = 0,
      strikes,
      strikesScore = 0,
    } = this.state;

    const totalScore = redScore + yellowScore + greenScore + blueScore - strikesScore;

    return (
      <Paper className={classes.paper}>
        <NumberRow color={'red'} row={red} onClick={this.handleClick} />
        <NumberRow color={'yellow'} row={yellow} onClick={this.handleClick} />
        <NumberRow color={'green'} row={green} reverse onClick={this.handleClick} />
        <NumberRow color={'blue'} row={blue} reverse onClick={this.handleClick} />
        <Grid container spacing={1} justify='space-between' alignItems='center' className={classes.row}>
          <Grid item>
            <Grid container spacing={1} justify='space-between' className={classes.scoreContainer}>
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
          <Grid item className={classes.strikeContainer}>
            <div className={classes.strikesLabel}>
              <span className={classes.strikesLabelX}>X</span> = -5
            </div>
            <Grid container justify='space-around'>
              {strikes.map((strike, i) => strike
                ? <div key={i} onClick={() => this.handleClick('strikes', i)} className={classes.strike}>X</div>
                : <div key={i} onClick={() => this.handleClick('strikes', i)} className={classes.strikeEmpty}></div>
               )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify='space-between' alignItems='center' className={classes.scoreRow}>
          <Grid item>totals</Grid>
          <Grid item className={clsx(classes.block, classes.blockRed)}>
            {redScore}
          </Grid>
          <Grid item>+</Grid>
          <Grid item className={clsx(classes.block, classes.blockYellow)}>
            {yellowScore}
          </Grid>
          <Grid item>+</Grid>
          <Grid item className={clsx(classes.block, classes.blockGreen)}>
            {greenScore}
          </Grid>
          <Grid item>+</Grid>
          <Grid item className={clsx(classes.block, classes.blockBlue)}>
            {blueScore}
          </Grid>
          <Grid item>-</Grid>
          <Grid item className={clsx(classes.block, classes.blockWhite)}>
            {strikesScore}
          </Grid>
          <Grid item>=</Grid>
          <Grid item className={clsx(classes.block, classes.blockWhite)}>
            {totalScore}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(QuixxScoreCard);
