import React, { Component } from 'react';
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
  },
  whiteDiceContainer: {
    border: '1px solid black',
    borderRadius: '0.8em',
    overflow: 'hidden',
    height: '4.5em',
    width: '4.5em',
  },
  whiteDice: {
    color: 'white',
    backgroundColor: 'black',
    position: 'relative',
    top: '-0.06em',
  },
  redDice: {
    color: theme.palette.red.main,
    backgroundColor: 'white',
    position: 'relative',
    top: '-0.06em',
  },
  yellowDice: {
    color: theme.palette.yellow.main,
    backgroundColor: 'white',
    position: 'relative',
    top: '-0.06em',
  },
  greenDice: {
    color: theme.palette.green.main,
    backgroundColor: 'white',
    position: 'relative',
    top: '-0.06em',
  },
  blueDice: {
    color: theme.palette.blue.main,
    backgroundColor: 'white',
    position: 'relative',
    top: '-0.06em',
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
        <Grid container spacing={4} jusitfy='space-around' alignItems='center' className={classes.dice}>
          <Grid item>
            <Button
              className={classes.button}
              variant='contained'
              size='large'
              onClick={this.handleRoll}
            >
              <FontAwesomeIcon icon={faDice} className={classes.leftIcon} size='lg' />
              Roll
            </Button>
          </Grid>
          <Grid item>
            <div className={classes.whiteDiceContainer}>
              <FontAwesomeIcon
                className={classes.whiteDice}
                icon={dice[white]} 
                size='5x'
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.whiteDiceContainer}>
              <FontAwesomeIcon
                className={classes.whiteDice}
                icon={dice[white2]}
                size='5x'
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.whiteDiceContainer}>
              <FontAwesomeIcon
                className={classes.redDice}
                icon={dice[red]}
                size='5x'
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.whiteDiceContainer}>
              <FontAwesomeIcon
                className={classes.yellowDice}
                icon={dice[yellow]}
                size='5x'
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.whiteDiceContainer}>
              <FontAwesomeIcon
                className={classes.greenDice}
                icon={dice[green]}
                size='5x'
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.whiteDiceContainer}>
              <FontAwesomeIcon
                className={classes.blueDice}
                icon={dice[blue]}
                size='5x'
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(DiceRow);