import React, { Component } from 'react';
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
    border: '1px solid',
    borderBottom: 0,
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
    display: 'inline-block',
    float: 'right',
    fontSize: '2vw',
    marginRight: '0.15em',
    textAlign: 'center',
    width: '15%',
  },
  fiveXBottom: {
    border: '1px solid',
    borderBottomLeftRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    borderTop: 0,
    display: 'inline-block',
    float: 'right',
    height: '0.25em',
    marginBottom: theme.spacing(),
    marginRight: '0.15em',
    marginTop: '-0.25em',
    width: '15%',
  },
  footer: {
    textAlign: 'center',
    fontSize: '1.5vw',
    margin: `${theme.spacing(2)} auto`,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: '1vw',
    margin: `${theme.spacing(2)} auto`,
  },
  paper: {
    backgroundColor: theme.palette.grey.light,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(),

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

const diceIndex = { red: 2, yellow: 3, green: 4, blue: 5 };
const blankState = {
  blue: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, true]
  ],
  blueScore: 0,
  disabledDice: new Array(6).fill(false),
  green: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, true]
  ],
  greenScore: 0,
  red: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, true]
  ],
  redScore: 0,
  showBlue: false, 
  showFinal: false,
  showGreen: false, 
  showRed: false, 
  showStrikes: false,
  showYellow: false,
  strikes: new Array(4).fill(false),
  strikesScore: 0,
  yellow: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, true]
  ],
  yellowScore: 0,
}

class QuixxScoreCard extends Component {
  state = cloneDeep(blankState);

  componentDidMount() {
    // if there is a saved state, reload it
    let savedState = localStorage.getItem('QwixxAppState2');
    if (savedState) {
      savedState = JSON.parse(savedState);
      localStorage.removeItem('QwixxAppState2');
      this.setState(savedState);
    }

    // save the state if the user navagates away or refreshes
    window.addEventListener('pagehide', () => {
      localStorage.setItem('QwixxAppState', JSON.stringify(this.state));
    });

    // Rescale the card to fit on the screen on orientation change
    window.addEventListener('orientationchange', () => {
      this.setState({ scaler: this.getScaler() });
    });

    // set the initial scaler for the game
    this.setState({ scaler: this.getScaler() });
  }

  /**
   * Calculates a scale factor for how to scale the card and dice so they
   * always fit on the screen regardless of orientation. Scaler is always 1
   * unless the height < width, then we scale based on the height of the screen
   */
  getScaler = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const gameHeight = document.getElementById('game-wrapper').clientHeight;

    let scaler = 1;
    if (height < width) {
      scaler = window.innerHeight / gameHeight;
    }

    return scaler;
  }

  /**
   * Handles clicks for the colored number rows
   * @param {String} color The color of the row
   * @param {Number} index The index of the clicked square
   * @param {Boolean} isLock Whether or not the square clicked is a lock
   */
  handleClick = (color, index, isLock) => {
    const { disabledDice } = this.state;
    let [marks, disabled] = this.state[color];

    // if disabled do nothing
    if (disabled[index]) {
      return;
    }

    // Disable a dice if a lock is marked
    // really means toggle the state of both lock and dice when they are in the state
    // this must be done before marks is modified
    if (isLock && (
      (!marks[index] && !disabledDice[diceIndex[color]]) ||
      (marks[index] && disabledDice[diceIndex[color]])
    )) {
      this.toggleDisabled(color);
    }

    // mark the square
    marks[index] = !marks[index];

    // calculate new score
    const numMarks = marks.filter(value => value).length;
    const score = scoring[numMarks];

    // disable all before the index and enable all after
    disabled = disabled.map((element, i) => {
      // Check lock section first, then check the rest
      return (i >= marks.length - 2 && numMarks < 5) || i < marks.lastIndexOf(true);
    });

    this.setState({
      [color]: [marks, disabled],
      [`${color}Score`]: score,
    });
  }

  /**
   * Handles clicks for the strike row 
   * @param {Number} index The index of the Strike that was clicked
   */
  handleClickStrikes = (index) => {
    const marks = this.state.strikes;

    // mark the square
    marks[index] = !marks[index];

    // calculate new score
    const score = marks.filter(value => value).length * 5;

    this.setState({
      strikes: marks,
      strikesScore: score,
    });
  }

  handleReset = () => {
    if (window.confirm('Are you sure you want to reset the card?')) {
      this.setState(cloneDeep(blankState));
    }
  }

  toggleDisabled = (color) => {
    const { disabledDice } = this.state;
    let [marks, disabled] = this.state[color];
    const index = diceIndex[color];

    // toggle the specified dice
    disabledDice[index] = !disabledDice[index];

    // disable or enable the entries of a row
    if (disabledDice[index]) {
      disabled = disabled.map(() => true);

      // don't disable the lock if it is marked
      if (marks[marks.length - 1]) {
        disabled[disabled.length - 1] = false;
      }
    } else {
      const numMarks = marks.filter(value => value).length;
      disabled = disabled.map((element, i) => {
        // Check lock section first, then check the rest
        return (i >= marks.length - 2 && numMarks < 5) || i < marks.lastIndexOf(true);
      });
    }

    this.setState({ 
      disabledDice,
      [color]: [marks, disabled],
    });
  }

  render() {
    const { classes } = this.props;
    const {
      blueScore = 0,
      disabledDice,
      greenScore = 0,
      redScore = 0,
      scaler,
      showBlue,
      showFinal,
      showGreen,
      showRed,
      showStrikes,
      showYellow,
      strikes,
      strikesScore = 0,
      yellowScore = 0,
    } = this.state;

    return (
      <>
        <AppBar onReset={this.handleReset} />
        <div id='game-wrapper' className={classes.gameWrapper} style={{ transform: `scale(${scaler})`}}>
          <DiceRow 
            disabledDice={disabledDice}
            toggleDisabled={this.toggleDisabled}
          />
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
              onClick={(i) => this.handleClickStrikes(i)}
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
        </div>
        <div className={classes.disclaimer}>
          QWIXX is a trademark of <a href='https://gamewright.com'>Gamewright</a>, a division of Ceaco, Inc.
          This app has been created as a passion project by <a href='https://sutherlandon.com'>Sutherlandon</a>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(QuixxScoreCard);
