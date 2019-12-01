import React, { Component } from 'react';
import clsx from 'clsx';
import { Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { One, Two, Three, Four, Five, Six } from './DiceFaces';

const diceFaces = [One, Two, Three, Four, Five, Six];

const styles = (theme) => ({
  button: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
    fontSize: '2vw',
    '&:hover': {
      backgroundColor: theme.palette.blue.main,
    }
  },
  diceWrapper: {
    border: '0.03em solid black',
    borderRadius: '0.2em',
    fontSize: '7vw',
  },
  diceBlock: {
    fontSize: '7vw',
  },
  dice: {
    borderRadius: '0.2em',
    height: '0.88em',
    width: '0.88em',
  },
  diceRow: {
    lineHeight: 0,
    fontSize: '7vw',
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
  whiteDice: {
    color: 'black',
    backgroundColor: 'white',
  },
  redDice: {
    backgroundColor: theme.palette.red.main,
    color: 'white',
  },
  yellowDice: {
    backgroundColor: theme.palette.yellow.main,
    color: 'white',
  },
  greenDice: {
    backgroundColor: theme.palette.green.main,
    color: 'white',
  },
  blueDice: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
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
    const White = diceFaces[white];
    const White2 = diceFaces[white2];
    const Red = diceFaces[red];
    const Yellow = diceFaces[yellow];
    const Green = diceFaces[green];
    const Blue = diceFaces[blue];

    return (
      <Paper className={classes.paper}>
        <Grid
          className={classes.diceRow}
          container
          spacing={1}
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
            <div className={clsx(classes.diceWrapper, classes.whiteDice)}>
              <White className={classes.dice} />
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(classes.diceWrapper, classes.whiteDice)}>
              <White2 className={classes.dice} />
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(classes.diceWrapper, classes.redDice)}>
              <Red className={classes.dice} />
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(classes.diceWrapper, classes.yellowDice)}>
              <Yellow className={classes.dice} />
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(classes.diceWrapper, classes.greenDice)}>
              <Green className={classes.dice} />
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(classes.diceWrapper, classes.blueDice)}>
              <Blue className={classes.dice} />
            </div>
          </Grid>
          {/* <Grid item>
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
          </Grid> */}
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(DiceRow);