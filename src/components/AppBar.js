import React from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey.darker,
    color: 'white',
    marginBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  appTitle: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    marginRight: theme.spacing(4),
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  reset: {
    backgroundColor: theme.palette.red.main,
    color: 'white',
  },
}));

export default function QwixxAppBar({ onReset }) {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.appTitle}>
          Qwixx App
        </Typography>
        <Hidden xsDown>
          <Button
            className={classes.link}
            href='https://gamewright.com/pdfs/Rules/QwixxTM-RULES.pdf'
            target='_'
          >
            Rules of Play
          </Button>
        </Hidden>
        <Button
          className={classes.reset}
          variant='contained'
          onClick={onReset}
        >
          <FontAwesomeIcon icon={faRedo} className={classes.leftIcon}/>
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  );
}