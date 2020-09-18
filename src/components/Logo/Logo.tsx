import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import styles from './styles';

interface LogoProps extends WithStyles<typeof styles> {
  showCaption?: boolean;
  textCaption?: string | React.ReactNode;
}

const Logo = ({
  classes,
  showCaption = true,
  textCaption = <FormattedMessage id='logo.description' />,
}: LogoProps): JSX.Element => {
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
          {textCaption}
        </Typography>
      ) : null}
    </>
  );
};

Logo.defaultProps = {
  showCaption: false,
  textCaption: '',
};

export default Logo;
