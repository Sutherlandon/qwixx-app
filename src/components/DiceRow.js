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
    height: '0.91em',
    cursor: 'pointer',
    width: '0.91em',
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
  disabledDiceWrapper: {
    backgroundColor: theme.palette.grey.main,
    color: 'black',
  },
  disabledDice: {
    position: 'relative',
    top: '0.45em',
    left: '0.1em',
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
    dice: [5, 5, 5, 5, 5, 5],
    disabledDice: [false, false, false, false, false, false],
    rolling: false,
  }

  componentDidUpdate() {
    if (this.state.rolling) {
      setTimeout(() => this.setState({ rolling: false }), 500);
    }
  }

  toggleDisabled = (i) => {
    const { disabledDice } = this.state;
    disabledDice[i] = !disabledDice[i];
    this.setState({ disabledDice });
  }

  handleRoll = () => {
    const dice = this.state.dice.map((number, i) => {
      // never change a disabled die's number
      // it wouldn't change if it was sitting out of the game on the table
      // would it?
      if (this.state.disabledDice[i]) {
        return number;
      }

      return Math.floor(Math.random() * 6);
    });

    this.setState({
      dice,
      rolling: true,
    });
  }

  render() {
    const { classes } = this.props;
    const { dice, disabledDice, rolling } = this.state;
    const [white, white2, red, yellow, green, blue] = dice;
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
              disabled={rolling}
              variant='contained'
              onClick={this.handleRoll}
            >
              <FontAwesomeIcon icon={faDice} className={classes.leftIcon} size='lg' />
              Roll
            </Button>
          </Grid>
          {/* Make this thing a component already! */}
          <Grid item>
            <div 
              className={clsx(
                classes.diceWrapper,
                disabledDice[0] ? classes.disabledDiceWrapper : classes.whiteDice,
                { 'rotate-center': rolling && !disabledDice[0]  }
              )}
              onClick={() => this.toggleDisabled(0)}
            >
              {disabledDice[0]
                ? <div className={classes.disabledDice}>X</div>
                : !rolling
                  ? <White className={classes.dice} />
                  : null }
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(
              classes.diceWrapper,
              classes.whiteDice,
              { 'rotate-center': rolling }
            )}>
              {!rolling ? <White2 className={classes.dice} /> : null }
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(
              classes.diceWrapper,
              classes.redDice,
              { 'rotate-center': rolling }
            )}>
              {!rolling ? <Red className={classes.dice} /> : null }
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(
              classes.diceWrapper,
              classes.yellowDice,
              { 'rotate-center': rolling }
            )}>
              {!rolling ? <Yellow className={classes.dice} /> : null }
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(
              classes.diceWrapper,
              classes.greenDice,
              { 'rotate-center': rolling }
            )}>
              {!rolling ? <Green className={classes.dice} /> : null }
            </div>
          </Grid>
          <Grid item>
            <div className={clsx(
              classes.diceWrapper,
              classes.blueDice,
              { 'rotate-center': rolling }
            )}>
              {!rolling ? <Blue className={classes.dice} /> : null }
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(DiceRow);