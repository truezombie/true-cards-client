import React from 'react';

import { WithStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Logo from '../Logo';
import Copyright from '../Copyright';

import styles from './styles';

interface AppWrapperPrimaryPagesProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

const AppWrapperPrimaryPages = ({
  classes,
  children,
}: AppWrapperPrimaryPagesProps) => (
  <Container className={classes.container} component='main' maxWidth='xs'>
    <div className={classes.paperWrapper}>
      <Logo />
      <Paper elevation={0} variant='outlined' className={classes.paper}>
        {children}
      </Paper>
    </div>
    <Copyright />
  </Container>
);

export default AppWrapperPrimaryPages;
