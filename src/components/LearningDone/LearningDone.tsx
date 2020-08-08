import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ROUTES from '../../constants/router';

import styles from './styles';

interface LearningDoneProps extends WithStyles<typeof styles> {
  onResetCurrentSession: () => void;
}

const LearningDone = ({
  classes,
  onResetCurrentSession,
}: LearningDoneProps) => {
  useEffect(() => {
    onResetCurrentSession();
  }, []);

  return (
    <Container maxWidth='sm' className={classes.container}>
      <Typography variant='h4' gutterBottom align='center'>
        Well done!
      </Typography>
      <Button
        component={Link}
        to={ROUTES.main}
        variant='outlined'
        color='primary'
      >
        Go to card sets page
      </Button>
    </Container>
  );
};

export default LearningDone;
