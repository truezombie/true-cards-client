import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import ROUTES from '../../constants/router';
import { AppWrapperPrimaryPages, LoaderLinear } from '../../components';
import styles from './styles';

interface PageRegistrationProps extends WithStyles<typeof styles> {
  isLoading: boolean;
  isEmailWasSend: boolean;
  onSetPreRegistrationEmail: (data: {
    variables: {
      email: string;
    };
  }) => void;
}

const PageRegistration = ({
  classes,
  isLoading,
  isEmailWasSend,
  onSetPreRegistrationEmail,
}: PageRegistrationProps): JSX.Element => {
  const [currentEmail, setCurrentEmail] = useState<string>('');
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
  });

  return (
    <AppWrapperPrimaryPages>
      <>
        <Grid container alignItems='center' className={classes.header}>
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
        <LoaderLinear show={isLoading} />
        {!isEmailWasSend ? (
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={({ email }, { setSubmitting }) => {
              onSetPreRegistrationEmail({
                variables: {
                  email,
                },
              });

              setCurrentEmail(email);
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  <FormattedMessage id='btn.send.email' />
                </Button>
              </form>
            )}
          </Formik>
        ) : (
          <Box p={3}>
            <Typography variant='body2' align='center'>
              <FormattedMessage
                id='sign.up.email.message'
                values={{ value: currentEmail }}
              />
            </Typography>
          </Box>
        )}
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
