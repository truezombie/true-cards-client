import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const GET_TOKENS_QUERY = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      authToken
      refreshToken
    }
  }
`;
