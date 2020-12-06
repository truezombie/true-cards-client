import gql from 'graphql-tag';

export const GET_SETTING_PAGE_DATA_QUERY = gql`
  {
    me {
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSONAL_DATA_QUERY = gql`
  mutation($firstName: String!, $lastName: String!) {
    updatePersonalData(firstName: $firstName, lastName: $lastName)
  }
`;
