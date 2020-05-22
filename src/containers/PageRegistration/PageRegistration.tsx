import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AppWrapperPrimaryPages } from '../../components';
import ROUTES from '../../constants/router';
import APP from '../../constants/app';
import styles from './styles';

interface PageRegistrationProps extends WithStyles<typeof styles> {}

export const QUERY_TOKENS = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      authToken
      refreshToken
    }
  }
`;

const PageRegistration = ({ classes }: PageRegistrationProps) => {
  const [mutate, query] = useMutation(QUERY_TOKENS); // eslint-disable-line
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
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            mutate({
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
                size='small'
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
                size='small'
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
                size='small'
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
                size='small'
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isSubmitting}
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
