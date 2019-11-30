import React, { Component } from 'react';
import clsx from 'clsx';
import { Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDice,
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from '@fortawesome/free-solid-svg-icons';

const dice = [
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
]

const styles = (theme) => ({
  button: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
    fontSize: '2vw',
  },
  diceWrapper: {
    border: '0.03em solid black',
    borderRadius: '0.2em',
    fontSize: '7vw',
    height: '0.88em',
    overflow: 'hidden',
  },
  dice: {
    position: 'relative',
    top: '-0.25em',
  },
  whiteDice: {
    color: 'white',
    backgroundColor: 'black',
  },
  redDice: {
    color: theme.palette.red.main,
    backgroundColor: 'white',
  },
  yellowDice: {
    color: theme.palette.yellow.main,
    backgroundColor: 'white',
  },
  greenDice: {
    color: theme.palette.green.main,
    backgroundColor: 'white',
  },
  blueDice: {
    color: theme.palette.blue.main,
    backgroundColor: 'white',
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    marginBottom: theme.spacing(6),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: 'fit-content',
  },
});

class DiceRow extends Component {
  state = {
    dice: [0, 0, 0, 0, 0, 0],
  }

  handleRoll = () => {
    this.setState({
      dice: this.state.dice.map(() => Math.floor(Math.random() * 6)),
    });
  }

  render() {
    const { classes } = this.props;
    const [white, white2, red, yellow, green, blue] = this.state.dice;

    return (
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={4}
          jusitfy='space-around'
          alignItems='center'
          wrap='nowrap'
        >
          <Grid item>
            <Button
              className={classes.button}
              variant='contained'
              onClick={this.handleRoll}
            >
              <FontAwesomeIcon icon={faDice} className={classes.leftIcon} size='lg' />
              Roll
            </Button>
          </Grid>
          <Grid item>
            <div className={classes.diceWrapper}>
              <FontAwesomeIcon
                className={clsx(classes.dice, classes.whiteDice)}
                icon={dice[white]} 
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.diceWrapper}>
              <FontAwesomeIcon
                className={clsx(classes.dice, classes.whiteDice)}
                icon={dice[white2]}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.diceWrapper}>
              <FontAwesomeIcon
                className={clsx(classes.dice, classes.redDice)}
                icon={dice[red]}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.diceWrapper}>
              <FontAwesomeIcon
                className={clsx(classes.dice, classes.yellowDice)}
                icon={dice[yellow]}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.diceWrapper}>
              <FontAwesomeIcon
                className={clsx(classes.dice, classes.greenDice)}
                icon={dice[green]}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.diceWrapper}>
              <FontAwesomeIcon
                className={clsx(classes.dice, classes.blueDice)}
                icon={dice[blue]}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(DiceRow);