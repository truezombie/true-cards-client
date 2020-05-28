import gql from 'graphql-tag';

export const IS_LOGGED_IN_QUERY = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_TOKENS_QUERY = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      authToken
      refreshToken
    }
  }
`;
