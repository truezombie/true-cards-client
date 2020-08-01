import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ROUTES from '../../constants/router';

import styles from './styles';

interface PageDoneProps extends WithStyles<typeof styles> {
  onResetCurrentSession: (data: { variables: { cardSetId: string } }) => void;
}

const PageDone = ({ classes, onResetCurrentSession }: PageDoneProps) => {
  const urlParams = useParams<{ id: string }>();

  useEffect(() => {
    onResetCurrentSession({ variables: { cardSetId: urlParams.id } });
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

export default PageDone;
