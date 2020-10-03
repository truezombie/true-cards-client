import gql from 'graphql-tag';
import { Resolvers } from '@apollo/client';

import { isLoggedIn } from './queries';
import { setLoggedIn } from './mutations';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    hasToken: Boolean!
  }

  extend type Mutation {
    setLoggedIn(isLoggedIn: Boolean!): null
  }
`;

const resolvers: Resolvers = {
  Query: {
    isLoggedIn,
  },
  Mutation: {
    setLoggedIn,
  },
};

export { typeDefs, resolvers };
