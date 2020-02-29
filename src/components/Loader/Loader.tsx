import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WithStyles } from '@material-ui/core/styles';

import styles from './styles';
import { LOADER_SIZE, LOADER_THICKNESS } from './constants';

interface LoaderProps extends WithStyles<typeof styles> {}

const Loader = ({ classes }: LoaderProps) => {
  return (
    <CircularProgress
      className={classes.root}
      color='primary'
      size={LOADER_SIZE}
      thickness={LOADER_THICKNESS}
    />
  );
};

export default Loader;
