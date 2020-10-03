import React from 'react';
import ReactDOM from 'react-dom';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {
  Observable,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  from,
  createHttpLink,
} from '@apollo/client';
import { resolvers, typeDefs } from './localState';
import { ERROR_CODES, getErrorMessage } from './utils/errors';
import CONFIG from './utils/config';
import App from './containers/App';

const httpLink = createHttpLink({
  uri: CONFIG.backendUrl,
  headers: {
    'client-name': 'true-cards.com',
    'client-version': '1.0.0',
  },
});

const ApolloComponent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const errorLink = onError(
    // TODO: need to refactor
    // eslint-disable-next-line consistent-return
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        const { cache } = operation.getContext();
        const oldHeaders = operation.getContext().headers;
        const errorCode = graphQLErrors[0]?.message;

        if (errorCode === ERROR_CODES.ERROR_TOKEN_AUTH_IS_NOT_VALID) {
          const oldRefreshToken = localStorage.getItem('refreshToken');

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
                  token: oldRefreshToken,
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
                cache.writeData({
                  data: {
                    isLoggedIn: !!localStorage.getItem('authToken'),
                  },
                });
                observer.error(e);
              });
          });
        }

        if (networkError) {
          console.log(`[Network error]: ${networkError}`); // eslint-disable-line
        }

        graphQLErrors.forEach((error) => {
          const errorMessage = getErrorMessage(error.message);

          if (errorMessage) {
            enqueueSnackbar(errorMessage);
          }
        });
      }
    }
  );

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        ...headers,
        authorization: token || '',
      },
    };
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink.concat(httpLink)]),
    resolvers,
    typeDefs,
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
    <ApolloComponent />
  </SnackbarProvider>,
  document.getElementById('root')
);
