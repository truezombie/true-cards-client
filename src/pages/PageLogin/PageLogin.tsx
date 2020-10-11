import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import ROUTES from '../../constants/router';
import APP from '../../constants/app';
import { AppWrapperPrimaryPages, LoaderLinear } from '../../components';
import styles from './styles';

interface PageLoginProps extends WithStyles<typeof styles> {
  isLoading: boolean;
  onSignIn: (data: { variables: { email: string; password: string } }) => void;
}

const PageLogin = ({
  classes,
  onSignIn,
  isLoading,
}: PageLoginProps): JSX.Element => {
  const intl = useIntl();

  const LoginValidationSchema = Yup.object().shape({
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
  });

  return (
    <AppWrapperPrimaryPages>
      <>
        <Grid container alignItems='center' className={classes.header}>
          <Grid item xs>
            <Typography component='h1' variant='h6'>
              <FormattedMessage id='btn.sign.in' />
            </Typography>
          </Grid>
          <Grid item>
            <Link href={ROUTES.registration} variant='body2'>
              <FormattedMessage id='btn.sign.up' />
            </Link>
          </Grid>
        </Grid>
        <LoaderLinear show={isLoading} />
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSignIn({
              variables: { email: values.email, password: values.password },
            });

            setSubmitting(false);
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
                variant='outlined'
                margin='normal'
                size='small'
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isSubmitting}
              >
                <FormattedMessage id='btn.sign.in' />
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

export default PageLogin;
