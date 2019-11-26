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
    marginTop: theme.spacing(2),
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
      showBlue, 
      green,
      greenScore = 0,
      showGreen, 
      red,
      redScore = 0,
      showRed, 
      yellow,
      yellowScore = 0,
      showYellow,
      strikes,
      strikesScore = 0,
      showStrikes,
    } = this.state;

    return (
      <Paper className={classes.paper}>
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
