import gql from 'graphql-tag';

// eslint-disable-next-line
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
