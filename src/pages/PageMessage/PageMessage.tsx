import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import styles from './styles';

interface PageMessageProps extends WithStyles<typeof styles> {
  link: string;
  message: string | JSX.Element;
  btnMessage: string | JSX.Element;
}

const PageMessage = ({
  classes,
  link,
  message,
  btnMessage,
}: PageMessageProps): JSX.Element => {
  return (
    <Container maxWidth='sm' className={classes.container}>
      <Typography variant='h5' gutterBottom align='center'>
        {message}
      </Typography>
      <Button
        size='small'
        component={Link}
        to={link}
        variant='outlined'
        color='primary'
      >
        {btnMessage}
      </Button>
    </Container>
  );
};

export default PageMessage;
