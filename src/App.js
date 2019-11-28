import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

import ColorRows from './components/ColorRows';
import ScoreRow from './components/ScoreRow';
import StrikesRow from './components/StrikesRow';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];

const styles = (theme) => ({
  paper: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(4),

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
  fiveXTop: {
    display: 'inline-block',
    textAlign: 'center',
    border: '1px solid',
    float: 'right',
    fontSize: '2vw',
    width: '15%',
    borderBottom: 0,
    marginRight: '0.15em',
    borderTopRightRadius: theme.spacing(3),
    borderTopLeftRadius: theme.spacing(3),
  },
  fiveXBottom: {
    display: 'inline-block',
    border: '1px solid',
    float: 'right',
    height: '0.25em',
    width: '15%',
    borderTop: 0,
    marginRight: '0.15em',
    marginTop: '-0.25em',
    marginBottom: theme.spacing(),
    borderBottomRightRadius: theme.spacing(4),
    borderBottomLeftRadius: theme.spacing(4),
  }
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
      blueScore = 0,
      greenScore = 0,
      redScore = 0,
      strikes,
      strikesScore = 0,
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
        <div className={classes.fiveXTop}>At least 5 X's</div>
        <ColorRows {...this.state} onClick={this.handleClick} />
        <div className={classes.fiveXBottom}></div>
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
