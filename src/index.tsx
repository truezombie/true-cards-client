import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { resolvers, typeDefs } from './resolvers';
import { ERROR_CODES } from './utils/errors';

import App from './containers/App';

// const ErrorContext = React.createContext([]);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('authToken'),
    'client-name': 'True cards [web]',
    'client-version': '1.0.0',
  },
});

const ApolloComponent = () => {
  // const { handleUpdateError } = useContext(ErrorContext);

  const errorLink = onError(
    // eslint-disable-next-line consistent-return
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        const { cache } = operation.getContext();
        const oldHeaders = operation.getContext().headers;
        const errorCode = graphQLErrors[0]?.message;
        // const errorMessage = getErrorMessage(errorCode);

        // if (errorMessage) {
        //   handleUpdateError([errorMessage]);
        // }

        if (errorCode === ERROR_CODES.ERROR_TOKEN_AUTH_IS_NOT_VALID) {
          const refreshToken = localStorage.getItem('refreshToken');

          return new Observable((observer) => {
            fetch('http://localhost:4000/graphql', {
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
                  token: refreshToken,
                },
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                localStorage.setItem(
                  'authToken',
                  res.data.generateTokens.authToken
                );
                localStorage.setItem(
                  'refreshToken',
                  res.data.generateTokens.refreshToken
                );

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: res.data.generateTokens.authToken,
                  },
                });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                forward(operation).subscribe(subscriber);
              })
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
      }
    }
  );

  const cache = new InMemoryCache();

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: ApolloLink.from([errorLink, httpLink]),
    resolvers,
    typeDefs,
  });

  cache.writeData({
    data: {
      errorMessage: '',
      isLoggedIn: !!localStorage.getItem('authToken'),
    },
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

// const ErrorProvider = ({ children }: { children: JSX.Element }) => {
//   const [errors, setError] = useState<string[]>([]);
//
//   const handleUpdateError = (err: string[]) => {
//     setError([...err]);
//   };
//
//   const ctx = { handleUpdateError };
//
//   return (
//     <ErrorContext.Provider value={ctx}>
//       {errors.map((message) => (
//         <SnackBar key={message} message={message} />
//       ))}
//       {children}
//     </ErrorContext.Provider>
//   );
// };

ReactDOM.render(
  // <ErrorProvider>
  <ApolloComponent />,
  // </ErrorProvider>,
  document.getElementById('root')
);
