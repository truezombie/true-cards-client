import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';
// import { GET_CART_ITEMS } from './pages/cart';
// import * as LaunchTileTypes from './pages/__generated__/LaunchTile';
// import * as GetCartItemTypes from './pages/__generated__/GetCartItems';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
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

interface AppResolvers extends Resolvers {
  // Launch: ResolverMap;
  // Mutation: ResolverMap;
}

const resolvers: AppResolvers = {};

// export const resolvers: AppResolvers = {
//   Launch: {
//     isInCart: (launch: LaunchTileTypes.LaunchTile, _, { cache }): boolean => {
//       const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({
//         query: GET_CART_ITEMS,
//       });
//       if (queryResult) {
//         return queryResult.cartItems.includes(launch.id);
//       }
//       return false;
//     },
//   },
//   Mutation: {
//     addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
//       const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({
//         query: GET_CART_ITEMS,
//       });
//       if (queryResult) {
//         const { cartItems } = queryResult;
//         const data = {
//           cartItems: cartItems.includes(id)
//             ? cartItems.filter((i) => i !== id)
//             : [...cartItems, id],
//         };
//         cache.writeQuery({ query: GET_CART_ITEMS, data });
//         return data.cartItems;
//       }
//       return [];
//     },
//   },
// };

export { typeDefs, resolvers };
