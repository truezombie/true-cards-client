import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { PageLogin } from '../../components';
import ROUTES from '../../constants/router';
import { GET_TOKENS_QUERY } from './queries';
import { IS_LOGGED_IN_QUERY } from '../App/queries';
import { isLoggedInVar } from '../../cache';

const Login = (): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);
  const [
    onSignIn,
    { data: dataTokens, loading: dataTokensIsLoading },
  ] = useMutation(GET_TOKENS_QUERY);

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.signIn.authToken);
      localStorage.setItem('refreshToken', dataTokens.signIn.refreshToken);

      isLoggedInVar(true);
    }
  }, [dataTokens]);

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

export default Login;
