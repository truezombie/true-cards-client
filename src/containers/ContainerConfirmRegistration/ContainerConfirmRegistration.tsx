import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import ROUTES from '../../constants/router';
import { isLoggedInVar } from '../../cache';
import { IS_LOGGED_IN_QUERY } from '../App/queries';
import { PageConfirmRegistration } from '../../pages';
import { ERROR_CODES, hasError } from '../../utils/errors';
import { useSnackBarNotification } from '../../hooks';
import {
  QUERY_CHECK_REGISTRATION_UUID,
  QUERY_CONFIRM_REGISTRATION,
} from './queries';

const ContainerConfirmRegistration = (): JSX.Element => {
  const urlParams = useParams<{ id: string }>();
  const [showErrorSnackBar] = useSnackBarNotification();
  const { data: localState } = useQuery(IS_LOGGED_IN_QUERY);
  const [
    onCheckRegistrationUuid,
    {
      data: checkRegistrationUuidData,
      loading: checkRegistrationUuidIsLoading,
      error: checkRegistrationUuidError,
    },
  ] = useMutation(QUERY_CHECK_REGISTRATION_UUID);
  const [
    onConfirmRegistration,
    {
      data: confirmRegistrationData,
      loading: confirmRegistrationIsLoading,
      error: confirmRegistrationError,
    },
  ] = useMutation(QUERY_CONFIRM_REGISTRATION);

  const isCorrectLink = useMemo(() => {
    return checkRegistrationUuidData?.checkUserRegistrationLinkUuid === 'OK';
  }, [checkRegistrationUuidData]);

  const isLoading = useMemo(() => {
    return (
      (!checkRegistrationUuidData && !checkRegistrationUuidError) ||
      checkRegistrationUuidIsLoading
    );
  }, [
    checkRegistrationUuidData,
    checkRegistrationUuidError,
    checkRegistrationUuidIsLoading,
  ]);

  const isWrongLink = useMemo(() => {
    return (
      hasError(
        checkRegistrationUuidError,
        ERROR_CODES.ERROR_PRE_REGISTERED_DATA_NOT_FOUND
      ).hasError ||
      hasError(
        confirmRegistrationError,
        ERROR_CODES.ERROR_PRE_REGISTERED_DATA_NOT_FOUND
      ).hasError
    );
  }, [checkRegistrationUuidError, confirmRegistrationError]);

  useEffect(() => {
    onCheckRegistrationUuid({ variables: { uuid: urlParams?.id } });
  }, []);

  useEffect(() => {
    if (confirmRegistrationData) {
      localStorage.setItem(
        'authToken',
        confirmRegistrationData.signUp.authToken
      );
      localStorage.setItem(
        'refreshToken',
        confirmRegistrationData.signUp.refreshToken
      );

      isLoggedInVar(true);
    }
  }, [confirmRegistrationData]);

  useEffect(() => {
    showErrorSnackBar(
      ERROR_CODES.ERROR_PRE_REGISTERED_DATA_NOT_FOUND,
      checkRegistrationUuidError
    );
    showErrorSnackBar(
      ERROR_CODES.ERROR_PRE_REGISTERED_DATA_NOT_FOUND,
      confirmRegistrationError
    );
  }, [checkRegistrationUuidError, confirmRegistrationError]);

  return localState.isLoggedIn ? (
    <Redirect
      to={{
        pathname: ROUTES.main,
        state: { from: ROUTES.login },
      }}
    />
  ) : (
    <PageConfirmRegistration
      linkUuid={urlParams?.id || ''}
      isLoading={isLoading}
      isWrongLink={isWrongLink}
      isCorrectLink={isCorrectLink}
      onConfirmRegistration={onConfirmRegistration}
      confirmRegistrationIsLoading={confirmRegistrationIsLoading}
    />
  );
};

export default ContainerConfirmRegistration;
