import React from 'react';
import { WithStyles } from '@material-ui/core/styles';

import styles from './styles';

interface PageLoginProps extends WithStyles<typeof styles> {}

const PageForgotPassword = () => {
  return <h1>FORGOT PASSWORD</h1>;
};

export default PageForgotPassword;
