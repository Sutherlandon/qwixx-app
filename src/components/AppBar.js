import React from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faRedo } from '@fortawesome/free-solid-svg-icons';

import rules from '../QwixxTM-RULES.pdf';

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
    fontSize: 18,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.grey.main,
    },
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  reset: {
    backgroundColor: theme.palette.red.main,
    color: 'white',
    fontSize: 18,
    '&:hover': {
      color: theme.palette.red.main,
    },
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
            href={rules}
            target='_'
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className={classes.leftIcon}/>
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