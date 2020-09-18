import gql from 'graphql-tag';
import { Resolvers } from 'apollo-client';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cardsPerLearning: Int!
  }
`;

type AppResolvers = Resolvers;

const resolvers: AppResolvers = {};

export { typeDefs, resolvers };
