import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { WithStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import { Copyright, Logo } from '../../components';
import ROUTES from '../../constants/router';
import styles from './styles';

interface PageLoginProps extends WithStyles<typeof styles> {}

const PageLogin = ({ classes }: PageLoginProps) => {
  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Min password length 5 characters')
      .max(256, 'Max password length 256 characters')
      .required('Password is required'),
  });

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paperWrapper}>
        <Logo />
        <Paper className={classes.paper}>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography component='h1' variant='h6'>
                <FormattedMessage id='page.login.title' />
              </Typography>
            </Grid>
            <Grid item>
              <Link href={ROUTES.registration} variant='body2'>
                <FormattedMessage id='page.login.sign.up' />
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={values => {
              console.log('Log in is submitted', values); // eslint-disable-line no-console
            }}
          >
            {({
              errors,
              touched,
              values,
              handleSubmit,
              handleBlur,
              handleChange,
              isSubmitting,
              isValid,
              dirty,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label={<FormattedMessage id='input.email' />}
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label={<FormattedMessage id='input.password' />}
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={Boolean(errors.password && touched.password)}
                  helperText={touched.password && errors.password}
                />
                {/* <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label={<FormattedMessage id='checkbox.remember.me' />}
                /> */}
                <Button
                  size='large'
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  <FormattedMessage id='page.login.btn.sign.in' />
                </Button>
              </form>
            )}
          </Formik>
          <Typography align='center'>
            <Link href={ROUTES.forgotPassword} variant='body2'>
              <FormattedMessage id='page.login.link.forgot.password' />
            </Link>
          </Typography>
        </Paper>
      </div>
      <Copyright />
    </Container>
  );
};

export default PageLogin;
