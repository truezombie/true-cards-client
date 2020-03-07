import React from 'react';
import { FormattedMessage } from 'react-intl';
import { WithStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import { Copyright, Logo } from '../../components';
import ROUTES from '../../constants/router';
import styles from './styles';

interface PageLoginProps extends WithStyles<typeof styles> {}

const PageLogin = ({ classes }: PageLoginProps) => {
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paperWrapper}>
        <Logo />
        <Paper className={classes.paper}>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography component='h1' variant='h6'>
                <FormattedMessage
                  id='page.login.title'
                  defaultMessage='Login'
                />
              </Typography>
            </Grid>
            <Grid item>
              <Link href={ROUTES.registration} variant='body2'>
                Sign Up
              </Link>
            </Grid>
          </Grid>
          <form className={classes.form} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              size='large'
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Typography align='center'>
              <Link href={ROUTES.forgotPassword} variant='body2'>
                Forgot password?
              </Link>
            </Typography>
          </form>
        </Paper>
      </div>
      <Copyright />
    </Container>
  );
};

export default PageLogin;
