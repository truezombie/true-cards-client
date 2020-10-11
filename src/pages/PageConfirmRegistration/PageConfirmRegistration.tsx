import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import APP from '../../constants/app';
import ROUTES from '../../constants/router';
import { AppWrapperPrimaryPages, Loader, LoaderLinear } from '../../components';
import styles from './styles';

interface PageConfirmRegistrationProps extends WithStyles<typeof styles> {
  linkUuid: string;
  isLoading: boolean;
  isWrongLink: boolean;
  isCorrectLink: boolean;
  confirmRegistrationIsLoading: boolean;
  onConfirmRegistration: (data: {
    variables: {
      linkUuid: string;
      password: string;
      firstName: string;
      lastName: string;
    };
  }) => void;
}

const PageConfirmRegistration = ({
  classes,
  linkUuid,
  isLoading,
  isWrongLink,
  isCorrectLink,
  onConfirmRegistration,
  confirmRegistrationIsLoading,
}: PageConfirmRegistrationProps): JSX.Element => {
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
        [Yup.ref('password'), undefined],
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AppWrapperPrimaryPages>
          <>
            {isWrongLink && !isLoading ? (
              <Typography variant='body2' align='center'>
                <FormattedMessage
                  id='sign.up.wrong.link'
                  values={{
                    link: (
                      <Link to={ROUTES.registration}>
                        <FormattedMessage id='btn.sign.up' />
                      </Link>
                    ),
                  }}
                />
              </Typography>
            ) : null}
            {isCorrectLink ? (
              <>
                <Grid container alignItems='center' className={classes.header}>
                  <Grid item xs>
                    <Typography component='h1' variant='h6'>
                      Confirm registration
                    </Typography>
                  </Grid>
                </Grid>
                <LoaderLinear show={confirmRegistrationIsLoading} />
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={LoginValidationSchema}
                  onSubmit={(
                    { password, firstName, lastName },
                    { setSubmitting }
                  ) => {
                    onConfirmRegistration({
                      variables: {
                        linkUuid,
                        password,
                        firstName,
                        lastName,
                      },
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
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
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
                  <Link to={ROUTES.registration}>
                    <FormattedMessage id='page.registration.title' />
                  </Link>
                </Typography>
              </>
            ) : null}
          </>
        </AppWrapperPrimaryPages>
      )}
    </>
  );
};

export default PageConfirmRegistration;
