import React from 'react';
import ReactDOM from 'react-dom';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  Observable,
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  from,
  createHttpLink,
} from '@apollo/client';
import { resolvers, typeDefs } from './localState';
import { ERROR_CODES } from './utils/errors';
import { cache, isLoggedInVar } from './cache';
import CONFIG from './utils/config';
import App from './containers/App';

// TODO: need to refactor
isLoggedInVar(!!localStorage.getItem('authToken'));

const httpLink = createHttpLink({
  uri: CONFIG.backendUrl,
  headers: {
    'client-name': 'true-cards.com',
    'client-version': '1.0.0',
  },
});

const errorLink = onError(
  // TODO: need to refactor
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const oldHeaders = operation.getContext().headers;
      const errorCode = graphQLErrors[0]?.message;

      if (errorCode === ERROR_CODES.ERROR_TOKEN_AUTH_IS_NOT_VALID) {
        return new Observable((observer) => {
          fetch(CONFIG.backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
              mutation($token: String!) {
                generateTokens(token: $token) {
                  authToken
                  refreshToken
                }
              }
            `,
              variables: {
                token: localStorage.getItem('refreshToken'),
              },
            }),
          })
            .then((res) => res.json())
            .then(
              ({
                data: {
                  generateTokens: { authToken, refreshToken },
                },
              }) => {
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('refreshToken', refreshToken);
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: authToken,
                  },
                });

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              }
            )
            .catch((e) => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              isLoggedInVar(false);
              observer.error(e);
            });
        });
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`); // eslint-disable-line
      }
    }
  }
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('authToken') || '',
    },
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([errorLink, authLink.concat(httpLink)]),
  resolvers,
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
