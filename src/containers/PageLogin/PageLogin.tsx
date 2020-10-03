import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PageLogin } from '../../components';
import ROUTES from '../../constants/router';
import { GET_TOKENS_QUERY } from './queries';
import { IS_LOGGED_IN_QUERY, SET_IS_LOGGED_IN_QUERY } from '../App/queries';

const Login = (): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);
  const [
    onSignIn,
    { data: dataTokens, loading: dataTokensIsLoading },
  ] = useMutation(GET_TOKENS_QUERY);

  const [setLoggedIn] = useMutation(SET_IS_LOGGED_IN_QUERY, {
    variables: {
      isLoggedIn: true,
    },
  });

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.signIn.authToken);
      localStorage.setItem('refreshToken', dataTokens.signIn.refreshToken);

      setLoggedIn();
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
