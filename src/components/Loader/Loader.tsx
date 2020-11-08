import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import { loaderStyles } from './styles';
import { LOADER_SIZE, LOADER_THICKNESS } from './constants';

export type LoaderProps = WithStyles<typeof loaderStyles>;

const Loader = ({ classes }: LoaderProps): JSX.Element => (
  <CircularProgress
    className={classes.root}
    color='primary'
    size={LOADER_SIZE}
    thickness={LOADER_THICKNESS}
  />
);

export default withStyles(loaderStyles)(Loader);
