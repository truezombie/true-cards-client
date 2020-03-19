import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { AppWrapperPrimaryPages } from '../../components';
import ROUTES from '../../constants/router';
import styles from './styles';

interface PageRegistrationProps extends WithStyles<typeof styles> {}

const PageRegistration = ({ classes }: PageRegistrationProps) => {
  const LoginValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    nickName: Yup.string().required('Nick name is required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Min password length 5 characters')
      .max(256, 'Max password length 256 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .min(5, 'Min password length 5 characters')
      .max(256, 'Max password length 256 characters')
      .required('Password is required'),
  });

  return (
    <AppWrapperPrimaryPages>
      <>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography component='h1' variant='h6'>
              <FormattedMessage id='sign.up' />
            </Typography>
          </Grid>
          <Grid item>
            <Link href={ROUTES.login} variant='body2'>
              <FormattedMessage id='sign.in' />
            </Link>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            password: '',
            confirmPassword: '',
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
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='firstName'
                label={<FormattedMessage id='input.first.name' />}
                name='firstName'
                autoComplete='firstName'
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='lastName'
                label={<FormattedMessage id='input.last.name' />}
                name='lastName'
                autoComplete='lastName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='nickName'
                label={<FormattedMessage id='input.nick.name' />}
                name='nickName'
                autoComplete='nickName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nickName}
                error={Boolean(touched.nickName && errors.nickName)}
                helperText={touched.nickName && errors.nickName}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label={<FormattedMessage id='input.email' />}
                name='email'
                autoComplete='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label={<FormattedMessage id='input.password' />}
                type='password'
                id='password'
                autoComplete='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label={<FormattedMessage id='input.password.confirm' />}
                type='password'
                id='confirmPassword'
                autoComplete='confirmPassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={Boolean(
                  errors.confirmPassword && touched.confirmPassword
                )}
                helperText={touched.confirmPassword && errors.confirmPassword}
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
                <FormattedMessage id='sign.up' />
              </Button>
            </form>
          )}
        </Formik>
        <Typography align='center'>
          <Link href={ROUTES.forgotPassword} variant='body2'>
            <FormattedMessage id='page.login.link.forgot.password' />
          </Link>
        </Typography>
      </>
    </AppWrapperPrimaryPages>
  );
};

export default PageRegistration;
