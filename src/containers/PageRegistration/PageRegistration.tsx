import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks';

import { QUERY_TOKENS } from './queries';
import ROUTES from '../../constants/router';
import { IS_LOGGED_IN_QUERY } from '../PageLogin/queries';

import { PageRegistration } from '../../components';

const Registration = () => {
  const { data: localState } = useQuery(IS_LOGGED_IN_QUERY);
  const [onSignUp, { data: dataTokens }] = useMutation(QUERY_TOKENS);
  const client = useApolloClient();

  useEffect(() => {
    if (dataTokens) {
      localStorage.setItem('authToken', dataTokens.signUp.authToken);
      localStorage.setItem('refreshToken', dataTokens.signUp.refreshToken);

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
    <PageRegistration onSignUp={onSignUp} />
  );
};

export default Registration;
