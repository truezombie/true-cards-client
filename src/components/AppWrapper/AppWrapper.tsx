import React from 'react';

import { WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface AppWrapperProps extends WithStyles<typeof styles> {
  children: React.ReactChild;
}

const AppWrapper = ({ classes, children }: AppWrapperProps): JSX.Element => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default AppWrapper;
