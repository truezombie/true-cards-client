import { InMemoryCache } from '@apollo/client';

// TODO: need refactor
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          // eslint-disable-next-line no-use-before-define
          return isLoggedInVar();
        },
      },
    },
  },
});

export const isLoggedInVar = cache.makeVar<boolean>(
  !!localStorage.getItem('token')
);
