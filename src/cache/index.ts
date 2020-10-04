import { InMemoryCache, makeVar } from '@apollo/client';
import { GraphQLError } from 'graphql';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

export const graphQLErrorsVar = makeVar<readonly GraphQLError[]>([]);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        graphQLErrors() {
          return graphQLErrorsVar();
        },
      },
    },
  },
});
