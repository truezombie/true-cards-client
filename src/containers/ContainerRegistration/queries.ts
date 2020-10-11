import gql from 'graphql-tag';

// eslint-disable-next-line
export const QUERY_SET_PREREGISTRATION_EMAIL = gql`
  mutation($email: String!) {
    setPreRegistrationEmail(email: $email)
  }
`;
