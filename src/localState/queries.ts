import { Resolver } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const isLoggedIn: Resolver = (): boolean => {
  return !!localStorage.getItem('authToken');
};
