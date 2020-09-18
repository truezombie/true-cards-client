import gql from 'graphql-tag';

export const QUERY_CHECK_REGISTRATION_UUID = gql`
  mutation($uuid: String!) {
    checkUserRegistrationLinkUuid(uuid: $uuid)
  }
`;

export const QUERY_CONFIRM_REGISTRATION = gql`
  mutation(
    $linkUuid: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      linkUuid: $linkUuid
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      authToken
      refreshToken
    }
  }
`;
