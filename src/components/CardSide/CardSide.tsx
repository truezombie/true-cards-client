import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import styles from './styles';

interface CardSideProps extends WithStyles<typeof styles> {
  message?: string;
  description?: string;
}

const CardSide = ({
  classes,
  message,
  description,
}: CardSideProps): JSX.Element => {
  return (
    <CardContent className={classes.cardBody}>
      <div>
        <Typography
          className={classes.cardInformation}
          variant='h6'
          component='p'
          align='center'
        >
          {message}
        </Typography>
        <Typography
          className={classes.cardDescription}
          variant='body2'
          component='p'
          align='center'
        >
          {description}
        </Typography>
      </div>
    </CardContent>
  );
};

CardSide.defaultProps = {
  message: '',
  description: '',
};

export default CardSide;
