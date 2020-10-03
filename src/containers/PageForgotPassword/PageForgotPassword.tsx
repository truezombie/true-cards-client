import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';

import { PageForgotPassword } from '../../components';
import { RESET_PASSWORD_QUERY, VERIFY_EMAIL_QUERY } from './queries';
import { IS_LOGGED_IN_QUERY } from '../App/queries';
import ROUTES from '../../constants/router';
import { isLoggedInVar } from '../../cache';

const ForgotPassword = (): JSX.Element => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { data: localState } = useQuery(IS_LOGGED_IN_QUERY);
  const [
    onResetPassword,
    { data: dataTokens, loading: resetPasswordDataIsLoading },
  ] = useMutation(RESET_PASSWORD_QUERY);
  const [
    onVerifyEmail,
    { data: verifyEmailData, loading: verifyEmailDataIsLoading },
  ] = useMutation(VERIFY_EMAIL_QUERY);

  useEffect(() => {
    if (verifyEmailData?.setResetPasswordVerifyKey === 'OK') {
      setActiveStep(activeStep + 1);
    }
  }, [verifyEmailData]);

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.resetPassword.authToken);
      localStorage.setItem(
        'refreshToken',
        dataTokens.resetPassword.refreshToken
      );

      setActiveStep(activeStep + 1);
      isLoggedInVar();
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

export default ForgotPassword;
