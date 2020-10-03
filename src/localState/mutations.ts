import { Resolver } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const setLoggedIn: Resolver = (_, { isLoggedIn }, { cache }): null => {
  cache.writeData({ data: { isLoggedIn } });

  return null;
};
