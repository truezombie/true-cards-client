import gql from 'graphql-tag';

export const LIST_CARD_SETS_QUERY = gql`
  query($search: String!, $page: Int!, $rowsPerPage: Int!) {
    cardSets(search: $search, page: $page, rowsPerPage: $rowsPerPage) {
      count
      cardSets {
        id
        name
      }
    }
  }
`;

export const SEARCH_CARD_SET_QUERY = gql`
  query {
    pageCardSetsSearch @client
    pageCardSetsPageNumber @client
    pageCardSetsRowsPerPage @client
  }
`;

export const CREATE_CARD_SET_QUERY = gql`
  mutation($name: String!) {
    createCardSet(name: $name)
  }
`;

export const UPDATE_CARD_SET_QUERY = gql`
  mutation($cardSetId: String!, $name: String!) {
    updateCardSet(cardSetId: $cardSetId, name: $name)
  }
`;

export const DELETE_CARD_SET_QUERY = gql`
  mutation($cardSetId: String!) {
    deleteCardSet(cardSetId: $cardSetId)
  }
`;
