import React, { Component, Fragment } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import AppBar from './components/AppBar';
import ColorRows from './components/ColorRows';
import DiceRow from './components/DiceRow';
import ScoreRow from './components/ScoreRow';
import StrikesRow from './components/StrikesRow';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];

const styles = (theme) => ({
  cardTitleRow: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  cardTitle: {
    color: theme.palette.grey.dark,
    display: 'inline-block',
    fontWeight: 'bold',
    marginRight: theme.spacing(4),
  },
  cardSubTitle: {
    color: theme.palette.grey.main,
    display: 'inline-block',
    fontWeight: 'bold',
    flexGrow: 1,
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
  },
  paper: {
    backgroundColor: theme.palette.grey.light,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),

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

const blankState = {
  red: new Array(12).fill(false),
  yellow: new Array(12).fill(false),
  green: new Array(12).fill(false),
  blue: new Array(12).fill(false),
  strikes: new Array(4).fill(false),
  blueScore: 0,
  greenScore: 0,
  redScore: 0,
  strikesScore: 0,
  yellowScore: 0,
  showBlue: false, 
  showGreen: false, 
  showRed: false, 
  showStrikes: false,
  showYellow: false,
  showFinal: false,
}

class QuixxScoreCard extends Component {
  state = cloneDeep(blankState);

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.retrunValue = "Are you sure you want to clear the scorecard?";
      });
    }
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

  handleReset = () => {
    if (window.confirm('Are you sure you want to reset the card?')) {
      this.setState(cloneDeep(blankState));
    }
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
      <Fragment>
        <AppBar onReset={this.handleReset} />
        <DiceRow />
        <Paper className={classes.paper}>
          <div className={classes.cardTitleRow}>
            <div className={classes.cardTitle}>QWIXX</div>
            <div className={classes.cardSubTitle}>GAMEWRIGHT</div>
            <div className={classes.fiveXTop}>At least 5 X's</div>
          </div>
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(QuixxScoreCard);
