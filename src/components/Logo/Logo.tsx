import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import styles from './styles';

interface LogoProps extends WithStyles<typeof styles> {
  showCaption?: boolean;
}

const Logo = ({ classes, showCaption = true }: LogoProps) => {
  return (
    <>
      <div className={classes.logoWrapper}>
        <Card variant='outlined' className={classes.card}>
          <Typography component='span' variant='h6' color='primary'>
            true
          </Typography>
        </Card>
        <Typography component='span' variant='h6' color='primary'>
          cards
        </Typography>
      </div>
      {showCaption ? (
        <Typography
          component='p'
          className={classes.caption}
          variant='caption'
          color='textSecondary'
        >
          App for learning everything via cards
        </Typography>
      ) : null}
    </>
  );
};

export default Logo;
