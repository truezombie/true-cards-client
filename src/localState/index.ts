import gql from 'graphql-tag';
import { Resolvers } from '@apollo/client';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    hasToken: Boolean!
  }

  extend type Mutation {
    setLoggedIn(isLoggedIn: Boolean!): null
  }
`;

// DO NOT UDE IT
const resolvers: Resolvers = {};

export { typeDefs, resolvers };
