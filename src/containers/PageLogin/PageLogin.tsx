import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { PageLogin } from '../../components';
import ROUTES from '../../constants/router';
import { IS_LOGGED_IN_QUERY, GET_TOKENS_QUERY } from './queries';

const Login = () => {
  const { data: localState } = useQuery(IS_LOGGED_IN_QUERY);
  const [mutate, { data: dataTokens }] = useMutation(GET_TOKENS_QUERY);
  const client = useApolloClient();

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.signIn.authToken);
      localStorage.setItem('refreshToken', dataTokens.signIn.refreshToken);

      client.writeData({ data: { isLoggedIn: true } });
    }
  }, [dataTokens]);

  return localState.isLoggedIn ? (
    <Redirect
      to={{
        pathname: ROUTES.main,
        state: { from: ROUTES.login },
      }}
    />
  ) : (
    <PageLogin onSignIn={mutate} />
  );
};

export default Login;
