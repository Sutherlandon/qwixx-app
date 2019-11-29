import React, { Component, Fragment } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { Paper, AppBar, Toolbar, Button, Typography, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import ColorRows from './components/ColorRows';
import ScoreRow from './components/ScoreRow';
import StrikesRow from './components/StrikesRow';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];

const styles = (theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey.darker,
    marginBottom: theme.spacing(4),
    color: 'white',
  },
  appTitle: {
    flexGrow: 1,
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
  link: {
    color: 'white',
    marginRight: theme.spacing(4),
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.grey.light,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),

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
  reset: {
    backgroundColor: theme.palette.red.main,
    color: 'white',
  },
  rules: {
    fontSize: '1.6vw',
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingTop: 0 ,
    textAlign: 'right',
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
      window.onbeforeunload = (e) => {
        return "Are you sure you want to reset the card?";
      }
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
        <AppBar position='static' className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6' className={classes.appTitle}>
              Qwixx App
            </Typography>
            <Hidden xsDown>
              <Button
                className={classes.link}
                href='https://gamewright.com/pdfs/Rules/QwixxTM-RULES.pdf'
              >
                Rules of Play
              </Button>
            </Hidden>
            <Button
              className={classes.reset}
              variant='contained'
              onClick={() => {
                if (window.confirm('Are you sure you want to reset the card?')) {
                  this.setState(cloneDeep(blankState));
                }}
              }
            >
              <FontAwesomeIcon icon={faRedo} className={classes.leftIcon}/>
              Reset
            </Button>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <div>
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
