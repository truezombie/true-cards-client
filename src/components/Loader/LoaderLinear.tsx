import React from 'react';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { linearLoaderStyles } from './styles';

export interface LoaderLinearProps
  extends WithStyles<typeof linearLoaderStyles> {
  show: boolean;
}

const LoaderLinear = ({ classes, show }: LoaderLinearProps): JSX.Element => {
  return (
    <Fade in={show}>
      <div className={classes.progressWrap}>
        <LinearProgress className={classes.progressWrap} />
      </div>
    </Fade>
  );
};

export default withStyles(linearLoaderStyles)(LoaderLinear);
