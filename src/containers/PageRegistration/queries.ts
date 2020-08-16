import gql from 'graphql-tag';

// eslint-disable-next-line
export const QUERY_TOKENS = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      authToken
      refreshToken
    }
  }
`;
