import gql from 'graphql-tag';

export const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

export const GRAPH_QL_ERRORS_QUERY = gql`
  query {
    graphQLErrors @client
  }
`;

export const LIST_CARD_SET_WITH_CARDS_QUERY = gql`
  query($cardSetId: String!) {
    cardSetWithCards(cardSetId: $cardSetId) {
      id
      name
      cardsMax
      cards {
        uuid
        front
        frontDescription
        back
        backDescription
        hasBackSide
        timeAdded
        timeLastSuccess
        timesSuccess
      }
    }
  }
`;
