import gql from 'graphql-tag';

export const RESET_PASSWORD_QUERY = gql`
  mutation($confirmationKey: String!, $password: String!) {
    resetPassword(confirmationKey: $confirmationKey, password: $password) {
      authToken
      refreshToken
    }
  }
`;

export const VERIFY_EMAIL_QUERY = gql`
  mutation($email: String!) {
    setResetPasswordVerifyKey(email: $email)
  }
`;
