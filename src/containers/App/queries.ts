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

export const GET_CARDS_QUERY = gql`
  query($cardSetId: String!, $search: String, $page: Int, $rowsPerPage: Int) {
    cards(
      cardSetId: $cardSetId
      search: $search
      page: $page
      rowsPerPage: $rowsPerPage
    ) {
      cardSetId
      cardSetName
      count
      cardsMax
      isFollowingCardSet
      cards {
        id
        cardSetId
        front
        frontDescription
        back
        backDescription
        hasBackSide
        timeAdded
        progress {
          timeLastSuccess
          timesSuccess
        }
      }
    }
  }
`;
