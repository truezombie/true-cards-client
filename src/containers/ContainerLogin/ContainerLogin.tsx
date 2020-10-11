import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { PageLogin } from '../../pages';
import { useSnackBarNotification } from '../../hooks';
import { isLoggedInVar } from '../../cache';
import { GET_TOKENS_QUERY } from './queries';
import { IS_LOGGED_IN_QUERY } from '../App/queries';
import { ERROR_CODES } from '../../utils/errors';
import ROUTES from '../../constants/router';

const ContainerLogin = (): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);
  const [showErrorSnackBar] = useSnackBarNotification();
  const [
    onSignIn,
    { data: dataTokens, loading: dataTokensIsLoading, error: dataTokensError },
  ] = useMutation(GET_TOKENS_QUERY);

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.signIn.authToken);
      localStorage.setItem('refreshToken', dataTokens.signIn.refreshToken);

      isLoggedInVar(true);
    }
  }, [dataTokens]);

  useEffect(() => {
    showErrorSnackBar(ERROR_CODES.ERROR_USER_NOT_EXIST, dataTokensError);
  }, [dataTokensError]);

  return data?.isLoggedIn ? (
    <Redirect
      to={{
        pathname: ROUTES.main,
        state: { from: ROUTES.login },
      }}
    />
  ) : (
    <PageLogin isLoading={dataTokensIsLoading} onSignIn={onSignIn} />
  );
};

export default ContainerLogin;
