import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/react-hooks';

import {
  QUERY_CHECK_REGISTRATION_UUID,
  QUERY_CONFIRM_REGISTRATION,
} from './queries';
import ROUTES from '../../constants/router';
import { IS_LOGGED_IN_QUERY, SET_IS_LOGGED_IN_QUERY } from '../App/queries';

import { PageConfirmRegistration } from '../../components';
import { ERROR_CODES, hasError } from '../../utils/errors';

const ConfirmRegistration = (): JSX.Element => {
  const { data: localState } = useQuery(IS_LOGGED_IN_QUERY);

  const [setLoggedIn] = useMutation(SET_IS_LOGGED_IN_QUERY, {
    variables: {
      isLoggedIn: true,
    },
  });

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
  const urlParams = useParams<{ id: string }>();

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
        checkRegistrationUuidError?.graphQLErrors,
        ERROR_CODES.ERROR_PRE_REGISTERED_DATA_NOT_FOUND
      ).hasError ||
      hasError(
        confirmRegistrationError?.graphQLErrors,
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

      setLoggedIn();
    }
  }, [confirmRegistrationData]);

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

export default ConfirmRegistration;