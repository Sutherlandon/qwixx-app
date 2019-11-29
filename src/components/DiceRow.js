import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  button: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
  },
  paper: {
    marginBottom: theme.spacing(2),
  },
});

class DiceRow extends Component {
  state = {
    dice: [0, 0, 0, 0, 0, 0],
  }

  handleRoll = () => {
    this.setState({
      dice: this.state.dice.map(d => Math.floor(Math.random() * 6) + 1),
    });
  }

  render() {
    const { classes } = this.props;
    const [white, white2, red, yellow, green, blue] = this.state.dice;

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={2} jusitfy='space-around'>
          <Grid item>
            <Button
              variant='contained'
              onClick={this.handleRoll}
            >
              Roll
            </Button>
          </Grid>
          <Grid item>{white}</Grid>
          <Grid item>{white2}</Grid>
          <Grid item>{red}</Grid>
          <Grid item>{yellow}</Grid>
          <Grid item>{green}</Grid>
          <Grid item>{blue}</Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(DiceRow);