import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';

import { RESET_PASSWORD_QUERY, VERIFY_EMAIL_QUERY } from './queries';
import { PageForgotPassword } from '../../pages';
import { IS_LOGGED_IN_QUERY } from '../App/queries';
import { isLoggedInVar } from '../../cache';
import { ERROR_CODES } from '../../utils/errors';
import { useSnackBarNotification } from '../../hooks';
import ROUTES from '../../constants/router';

const ContainerForgotPassword = (): JSX.Element => {
  const [showErrorSnackBar] = useSnackBarNotification();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { data: localState } = useQuery(IS_LOGGED_IN_QUERY);
  const [
    onResetPassword,
    {
      data: dataTokens,
      loading: resetPasswordDataIsLoading,
      error: resetPasswordDataError,
    },
  ] = useMutation(RESET_PASSWORD_QUERY);
  const [
    onVerifyEmail,
    {
      data: verifyEmailData,
      loading: verifyEmailDataIsLoading,
      error: verifyEmailError,
    },
  ] = useMutation(VERIFY_EMAIL_QUERY);

  useEffect(() => {
    if (verifyEmailData?.setResetPasswordVerifyKey === 'OK') {
      setActiveStep(activeStep + 1);
    }
  }, [verifyEmailData]);

  useEffect(() => {
    showErrorSnackBar(ERROR_CODES.ERROR_USER_NOT_EXIST, verifyEmailError);
    showErrorSnackBar(
      ERROR_CODES.ERROR_CONFIRMATION_KEY_IS_NOT_CORRECT,
      resetPasswordDataError
    );
  }, [verifyEmailError, resetPasswordDataError]);

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.resetPassword.authToken);
      localStorage.setItem(
        'refreshToken',
        dataTokens.resetPassword.refreshToken
      );

      setActiveStep(activeStep + 1);
      isLoggedInVar(true);
    }
  }, [dataTokens]);

  return localState.isLoggedIn ? (
    <Redirect
      to={{
        pathname: ROUTES.main,
        state: { from: ROUTES.forgotPassword },
      }}
    />
  ) : (
    <PageForgotPassword
      isLoading={verifyEmailDataIsLoading || resetPasswordDataIsLoading}
      onResetPassword={onResetPassword}
      onVerifyEmail={onVerifyEmail}
      activeStep={activeStep}
    />
  );
};

export default ContainerForgotPassword;
