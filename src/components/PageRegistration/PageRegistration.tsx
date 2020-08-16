import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import APP from '../../constants/app';
import ROUTES from '../../constants/router';
import { AppWrapperPrimaryPages } from '../index';
import styles from './styles';

interface PageRegistrationProps extends WithStyles<typeof styles> {
  onSignUp: (data: {
    variables: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };
  }) => void;
}

const PageRegistration = ({ classes, onSignUp }: PageRegistrationProps) => {
  const intl = useIntl();

  const LoginValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(
      intl.formatMessage({
        id: 'input.error.required.field',
      })
    ),
    lastName: Yup.string().required(
      intl.formatMessage({
        id: 'input.error.required.field',
      })
    ),
    email: Yup.string()
      .email(
        intl.formatMessage({
          id: 'input.error.email.not.valid',
        })
      )
      .required(
        intl.formatMessage({
          id: 'input.error.required.field',
        })
      ),
    password: Yup.string()
      .min(
        APP.minEnteredCharacters,
        intl.formatMessage(
          {
            id: 'input.error.min.length',
          },
          { value: APP.minEnteredCharacters }
        )
      )
      .max(
        APP.maxEnteredCharacters,
        intl.formatMessage(
          {
            id: 'input.error.max.length',
          },
          { value: APP.maxEnteredCharacters }
        )
      )
      .required(
        intl.formatMessage({
          id: 'input.error.required.field',
        })
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        intl.formatMessage({
          id: 'input.error.passwords.must.match',
        })
      )
      .required(
        intl.formatMessage({
          id: 'input.error.required.field',
        })
      ),
  });

  return (
    <AppWrapperPrimaryPages>
      <>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography component='h1' variant='h6'>
              <FormattedMessage id='btn.sign.up' />
            </Typography>
          </Grid>
          <Grid item>
            <Typography align='center' variant='body2'>
              <Link to={ROUTES.login}>
                <FormattedMessage id='btn.sign.in' />
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            onSignUp({
              variables: {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
              },
            });
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
          }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                size='small'
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
                size='small'
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
                size='small'
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
                size='small'
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
                size='small'
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isSubmitting}
              >
                <FormattedMessage id='btn.sign.up' />
              </Button>
            </form>
          )}
        </Formik>
        <Typography align='center' variant='body2'>
          <Link to={ROUTES.forgotPassword}>
            <FormattedMessage id='page.login.link.forgot.password' />
          </Link>
        </Typography>
      </>
    </AppWrapperPrimaryPages>
  );
};

export default PageRegistration;
