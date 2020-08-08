import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cardsPerLearning: Int!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {}

const resolvers: AppResolvers = {};

export { typeDefs, resolvers };
