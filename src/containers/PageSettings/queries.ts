import gql from 'graphql-tag';

export const GET_SETTING_PAGE_DATA_QUERY = gql`
  {
    me {
      email
      firstName
      lastName
      forgettingIndex
    }
  }
`;

export const UPDATE_FORGETTING_INDEX_QUERY = gql`
  mutation($forgettingIndex: Int!) {
    updateForgettingIndex(forgettingIndex: $forgettingIndex)
  }
`;
