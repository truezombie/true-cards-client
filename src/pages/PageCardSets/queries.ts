import gql from 'graphql-tag';

export const LIST_CARD_SETS_QUERY = gql`
  query($search: String!, $page: Int!, $rowsPerPage: Int!) {
    cardSets(search: $search, page: $page, rowsPerPage: $rowsPerPage) {
      count
      cardSets {
        id
        name
        isShared
        userId
      }
    }
  }
`;

export const LIST_SHARED_CARD_SETS_QUERY = gql`
  query($search: String!, $page: Int!, $rowsPerPage: Int!) {
    sharedCardSets(search: $search, page: $page, rowsPerPage: $rowsPerPage) {
      count
      subscriptions
      cardSets {
        id
        name
        isShared
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

export const SEARCH_SHARED_CARD_SET_QUERY = gql`
  query {
    pageSharedCardSetsSearch @client
    pageSharedCardSetsPageNumber @client
    pageSharedCardSetsRowsPerPage @client
  }
`;

export const CREATE_CARD_SET_QUERY = gql`
  mutation($name: String!) {
    createCardSet(name: $name)
  }
`;

export const UPDATE_CARD_SET_NAME_QUERY = gql`
  mutation($cardSetId: String!, $name: String!) {
    updateCardSetName(cardSetId: $cardSetId, name: $name)
  }
`;

export const UPDATE_CARD_SET_SHARING_QUERY = gql`
  mutation($cardSetId: String!, $isShared: Boolean!) {
    updateCardSetShare(cardSetId: $cardSetId, isShared: $isShared)
  }
`;

export const DELETE_CARD_SET_QUERY = gql`
  mutation($cardSetId: String!) {
    deleteCardSet(cardSetId: $cardSetId)
  }
`;

export const SUBSCRIBE_QUERY = gql`
  mutation($cardSetId: String!) {
    setSubscription(cardSetId: $cardSetId)
  }
`;

export const UNSUBSCRIBE_QUERY = gql`
  mutation($cardSetId: String!) {
    setUnSubscription(cardSetId: $cardSetId)
  }
`;
