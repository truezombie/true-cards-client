import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
      },
    },
  },
});
