import React, { useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';

import ROUTES from '../../constants/router';
import APP from '../../constants/app';
import { LoaderLinear, AppWrapperPrimaryPages } from '../../components';
import styles from './styles';

interface PageForgotPasswordProps extends WithStyles<typeof styles> {
  onResetPassword: (data: {
    variables: { confirmationKey: string; password: string };
  }) => void;
  onVerifyEmail: (data: { variables: { email: string } }) => void;
  activeStep: number;
  isLoading: boolean;
}

const PageForgotPassword = ({
  classes,
  onResetPassword,
  onVerifyEmail,
  activeStep,
  isLoading,
}: PageForgotPasswordProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const intl = useIntl();

  const EmailValidationSchema = Yup.object().shape({
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

  const LoginValidationSchema = Yup.object().shape({
    confirmationKey: Yup.string()
      .uuid(
        intl.formatMessage({
          id: 'input.error.uuid',
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

  const firstStep = () => {
    return (
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={EmailValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onVerifyEmail({
            variables: { email: values.email },
          });

          setEmail(values.email);
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={isSubmitting}
            >
              <FormattedMessage id='btn.send.verify.key' />
            </Button>
          </form>
        )}
      </Formik>
    );
  };

  const secondStep = () => {
    return (
      <Formik
        initialValues={{
          confirmationKey: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={LoginValidationSchema}
        onSubmit={({ confirmationKey, password }, { setSubmitting }) => {
          onResetPassword({
            variables: { confirmationKey, password },
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
            <Typography variant='body2' align='center'>
              <FormattedMessage
                id='reset.password.email.message'
                values={{ value: email }}
              />
            </Typography>
            <TextField
              variant='outlined'
              margin='normal'
              size='small'
              fullWidth
              name='confirmationKey'
              label='Confirmation key'
              type='text'
              id='confirmationKey'
              autoComplete='confirmation-key'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmationKey}
              error={Boolean(errors.confirmationKey && touched.confirmationKey)}
              helperText={touched.confirmationKey && errors.confirmationKey}
            />
            <TextField
              variant='outlined'
              margin='normal'
              size='small'
              fullWidth
              name='password'
              label='New password'
              type='password'
              id='password'
              autoComplete='current-password'
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
              label='Confirm new password'
              type='password'
              id='confirmPassword'
              autoComplete='confirmPassword'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              error={Boolean(errors.confirmPassword && touched.confirmPassword)}
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
              <FormattedMessage id='btn.set.new.password' />
            </Button>
          </form>
        )}
      </Formik>
    );
  };

  const redirectToMainPage = () => {
    return <FormattedMessage id='redirect.to.main.page.message' />;
  };

  const steps = useMemo(() => {
    return [
      {
        id: 1,
        message: (
          <FormattedMessage key='emailCheck' id='stepper.step.email.check' />
        ),
      },
      {
        id: 2,
        message: (
          <FormattedMessage
            key='resetPassword'
            id='stepper.step.reset.password'
          />
        ),
      },
    ];
  }, []);

  return (
    <AppWrapperPrimaryPages>
      <>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography component='h1' variant='h6'>
              <FormattedMessage id='page.login.link.forgot.password' />
            </Typography>
          </Grid>
          <Grid item>
            <Link href={ROUTES.registration} variant='body2'>
              <FormattedMessage id='btn.sign.up' />
            </Link>
          </Grid>
        </Grid>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(({ message, id }) => (
            <Step key={id}>
              <StepLabel>{message}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <LoaderLinear show={isLoading} />
        {activeStep === 0 ? firstStep() : null}
        {activeStep === 1 ? secondStep() : null}
        {activeStep > 1 ? redirectToMainPage() : null}
        <Typography align='center'>
          <Link href={ROUTES.login} variant='body2'>
            <FormattedMessage id='btn.sign.in' />
          </Link>
        </Typography>
      </>
    </AppWrapperPrimaryPages>
  );
};

export default PageForgotPassword;
