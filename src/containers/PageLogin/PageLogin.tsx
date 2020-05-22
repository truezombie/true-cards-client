import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import * as Yup from 'yup';
import { WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { AppWrapperPrimaryPages, Loader } from '../../components';
import ROUTES from '../../constants/router';
import APP from '../../constants/app';
import styles from './styles';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const QUERY_TOKENS = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      authToken
      refreshToken
    }
  }
`;

interface PageLoginProps extends WithStyles<typeof styles> {}

const PageLogin = ({ classes }: PageLoginProps) => {
  const { data: localState } = useQuery(IS_LOGGED_IN);
  const [mutate, { error, data: dataTokens, loading }] = useMutation(
    QUERY_TOKENS
  );
  const client = useApolloClient();

  useEffect(() => {
    if (error) {
      // TODO: error exeption
    } else if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.signIn.authToken);
      localStorage.setItem('refreshToken', dataTokens.signIn.refreshToken);

      client.writeData({ data: { isLoggedIn: true } });
    }
  }, [error, dataTokens]);

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

  return localState.isLoggedIn ? (
    <Redirect
      to={{
        pathname: ROUTES.main,
        state: { from: ROUTES.login },
      }}
    />
  ) : (
    <AppWrapperPrimaryPages>
      <>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography component='h1' variant='h6'>
              <FormattedMessage id='sign.in' />
            </Typography>
          </Grid>
          <Grid item>
            <Link href={ROUTES.registration} variant='body2'>
              <FormattedMessage id='sign.up' />
            </Link>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            mutate({
              variables: { email: values.email, password: values.password },
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
                variant='outlined'
                margin='normal'
                size='small'
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isSubmitting}
              >
                {loading ? <Loader /> : <FormattedMessage id='sign.in' />}
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
