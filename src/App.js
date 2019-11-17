import React, { Component } from 'react';
import clsx from 'clsx';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { blue, green, grey, red, yellow } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/LockOpenOutlined';

const numTiles = 12;
const scoring = [1, 2, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
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
  },
  lock: {
    fontSize: '2rem',
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
    height: 48,
    padding: 8,
  },
  blockRed: {
    borderColor: red[700],
    backgroundColor: red[100],
  },
  blockYellow: {
    borderColor: yellow[700],
    backgroundColor: yellow[100],
  },
  blockGreen: {
    borderColor: green[700],
    backgroundColor: green[100],
  },
  blockBlue: {
    borderColor: blue[700],
    backgroundColor: blue[100],
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  row: {
    marginBottom: theme.spacing(2),
  },
  score: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 8,
    paddingLeft: 4,
    paddingRight: 4,
  },
  scoreTop: {
    borderBottom: `1px solid ${grey[500]}`,
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
  },
  scoreBottom: {
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
  },
  strike: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 8,
    fontWeight: 'bold',
    padding: '7px',
  },
  strikeEmpty: {
    border: `2px solid ${grey[500]}`,
    borderRadius: 8,
    padding: '18px 12px',
  },
  strikesLabel: {
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

  handleClick = (list, index) => {
    const row = [...this.state[list]];
    row[index] = !row[index];
    
    this.setState({ [list]: row });
  }

  render() {
    const { classes } = this.props;
    const { 
      blue,
      blueScore,
      green,
      greenScore,
      red,
      redScore,
      yellow,
      yellowScore,
      strikes,
      strikeScore,
    } = this.state;

    const totalScore = Number(redScore) + Number(yellowScore) + Number(greenScore) + Number(blueScore) - Number(strikeScore);

    return (
      <Paper className={classes.paper}>
        <NumberRow color={'red'} row={red} onClick={this.handleClick} />
        <NumberRow color={'yellow'} row={yellow} onClick={this.handleClick} />
        <NumberRow color={'green'} row={green} reverse onClick={this.handleClick} />
        <NumberRow color={'blue'} row={blue} reverse onClick={this.handleClick} />
        <Grid container spacing={2} justify='space-between' alignItems='center' className={classes.row}>
          <Grid item xs={10}>
            <Grid container spacing={1} justify='space-around'>
              <Grid item className={classes.score}>
                <div className={classes.scoreTop}>X</div>
                <div className={classes.scoreBottom}>points</div>
              </Grid>
              {scoring.map((score, i) => (
                <Grid item key={score} className={classes.score}>
                  <div className={classes.scoreTop}>{i + 1}x</div>
                  <div className={classes.scoreBottom}>{score}</div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={2}>
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
            {/* <input name='redScore' onChange={this.handleChange} /> */}
          </Grid>
          <Grid item>+</Grid>
          <Grid item className={clsx(classes.block, classes.blockYellow)}>
            {/* <input name='yellowScore' onChange={this.handleChange} /> */}
          </Grid>
          <Grid item>+</Grid>
          <Grid item className={clsx(classes.block, classes.blockGreen)}>
            {/* <input name='greenScore' onChange={this.handleChange} /> */}
          </Grid>
          <Grid item>+</Grid>
          <Grid item className={clsx(classes.block, classes.blockBlue)}>
            {/* <input name='blueScore' onChange={this.handleChange} /> */}
          </Grid>
          <Grid item>-</Grid>
          <Grid item className={classes.block}>
            {/* <input name='strikeScore' onChange={this.handleChange} /> */}
          </Grid>
          <Grid item>=</Grid>
          <Grid item className={classes.block}>
            {totalScore || null}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(QuixxScoreCard);
