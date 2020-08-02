import gql from 'graphql-tag';

export const LIST_CARD_SETS_QUERY = gql`
  {
    cardSets {
      id
      name
      cardsAll
    }
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

export const CREATE_CARD_QUERY = gql`
  mutation(
    $cardSetId: String!
    $front: String!
    $frontDescription: String
    $back: String
    $backDescription: String
    $hasBackSide: Boolean
  ) {
    createCard(
      input: {
        front: $front
        frontDescription: $frontDescription
        back: $back
        backDescription: $backDescription
        hasBackSide: $hasBackSide
      }
      cardSetId: $cardSetId
    )
  }
`;

export const UPDATE_CARD_QUERY = gql`
  mutation(
    $uuid: String!
    $cardSetId: String!
    $front: String!
    $frontDescription: String
    $back: String
    $backDescription: String
    $hasBackSide: Boolean
  ) {
    updateCard(
      input: {
        front: $front
        frontDescription: $frontDescription
        back: $back
        backDescription: $backDescription
        hasBackSide: $hasBackSide
      }
      cardSetId: $cardSetId
      uuid: $uuid
    )
  }
`;

export const DELETE_CARD_QUERY = gql`
  mutation($cardUuid: String!, $cardSetId: String!) {
    deleteCard(cardUuid: $cardUuid, cardSetId: $cardSetId)
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const START_LEARNING_SESSION = gql`
  mutation($numberOfCards: Int!, $cardSetId: String!, $sessionType: String!) {
    startLearningSession(
      numberOfCards: $numberOfCards
      cardSetId: $cardSetId
      sessionType: $sessionType
    )
  }
`;

export const RESET_LEARNING_SESSION = gql`
  mutation($cardSetId: String!) {
    resetLearningSession(cardSetId: $cardSetId)
  }
`;

export const IS_EXIST_LEARNING_SESSION = gql`
  query($cardSetId: String!) {
    isExistLearningSession(cardSetId: $cardSetId)
  }
`;
