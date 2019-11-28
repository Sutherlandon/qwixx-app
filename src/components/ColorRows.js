import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FreeSection, LockSection } from './NumberRow';

const useStyles = makeStyles({
  section: {
    flexGrow: 1,
  },
  free: {
    width: '83.33333333%',
  },
  lock: {
    width: '16.66666666%',
  },
});

export default function ColorRows(props) {
  const classes = useStyles();
  const {
      blue,
      green,
      red,
      yellow,
      onClick,
  } = props;

  return (
    <Grid container spacing={1}>
      <Grid item className={clsx(classes.section, classes.free)}>
        <FreeSection
          color={'red'}
          onClick={onClick}
          row={red}
        />
        <FreeSection
          color={'yellow'}
          onClick={onClick}
          row={yellow}
        />
        <FreeSection
          color={'green'}
          onClick={onClick}
          row={green}
          reverse
        />
        <FreeSection
          color={'blue'}
          onClick={onClick}
          row={blue}
          reverse
        />
      </Grid>
      <Grid item className={clsx(classes.section, classes.lock)}>
        <LockSection
          color={'red'}
          onClick={onClick}
          row={red}
        />
        <LockSection
          color={'yellow'}
          onClick={onClick}
          row={yellow}
        />
        <LockSection
          color={'green'}
          onClick={onClick}
          row={green}
          reverse
        />
        <LockSection
          color={'blue'}
          onClick={onClick}
          row={blue}
          reverse
        />
      </Grid>
    </Grid>
  );
}