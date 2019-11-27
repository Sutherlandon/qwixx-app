import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import NumberRow from './components/NumberRow';
import ScoreRow from './components/ScoreRow';
import StrikesRow from './components/StrikesRow';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '4vw',
    },
  },
  blackBox: {
    border: '1px solid black',
    borderRadius: 20,
    fontSize: '2vw',
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(),
    paddingBottom: theme.spacing(72),
    position: 'fixed',
    right: 0,
    textAlign: 'center',
    top: 0,
    width: '15.85%',
  },
});

class QuixxScoreCard extends Component {
  state = {
    red: new Array(12).fill(false),
    yellow: new Array(12).fill(false),
    green: new Array(12).fill(false),
    blue: new Array(12).fill(false),
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
      strikes,
      strikesScore = 0,
      yellow,
      yellowScore = 0,
      showBlue, 
      showGreen, 
      showRed, 
      showStrikes,
      showYellow,
      showFinal,
    } = this.state;

    return (
      <Paper className={classes.paper}>
        <div className={classes.blackBox}>
          At least 5 X's
        </div>
        <NumberRow
          color={'red'}
          row={red}
          onClick={this.handleClick}
        />
        <NumberRow
          color={'yellow'}
          row={yellow}
          onClick={this.handleClick}
        />
        <NumberRow
          color={'green'}
          row={green}
          reverse
          onClick={this.handleClick}
        />
        <NumberRow
          color={'blue'}
          row={blue}
          reverse
          onClick={this.handleClick}
        />
        <StrikesRow
          scoring={scoring}
          strikes={strikes}
          onClick={(i) => this.handleClick('strikes', i)}
        />
        <ScoreRow
          showBlue={showBlue}
          showGreen={showGreen}
          showRed={showRed}
          showStrikes={showStrikes}
          showYellow={showYellow}
          showFinal={showFinal}
          greenScore={greenScore}
          blueScore={blueScore}
          redScore={redScore}
          strikesScore={strikesScore}
          yellowScore={yellowScore}
          revealScore={(score) => this.setState({ [score]: !this.state[score] })}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(QuixxScoreCard);
