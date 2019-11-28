import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

import NumberRow from './components/NumberRow';
import ScoreRow from './components/ScoreRow';
import StrikesRow from './components/StrikesRow';
import ColorRows from './components/ColorRows';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];

const styles = (theme) => ({
  paper: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    maxWidth: 1000,
    paddingTop: theme.spacing(8),

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
    '&:after': {
      border: '1px solid black',
      borderRadius: 10,
      content: "'At least 5 Xs'",
      fontSize: '2vw',
      marginRight: theme.spacing(5),
      marginTop: theme.spacing(),
      paddingBottom: theme.spacing(72),
      position: 'fixed',
      right: 0,
      textAlign: 'center',
      top: 0,
      width: '15.85%',
    }
  },
  fiveX: {
    display: 'inline-block',
    textAlign: 'center',
    border: '1px solid',
    float: 'right',
    width: '15%',
    borderBottom: '0',
    marginRight: '0.15em',
    borderTopRightRadius: '0.75em',
    borderTopLeftRadius: '0.75em',
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
        <div className={classes.fiveX}>At least 5 X's</div>
        <ColorRows {...this.state} onClick={this.handleClick} />
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
