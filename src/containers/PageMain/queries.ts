import gql from 'graphql-tag';

export const LIST_CARD_SETS_QUERY = gql`
  {
    cardSets {
      id
      name
      cardsMax
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
      cards {
        uuid
        front
        frontDescription
        back
        backDescription
        hasBackSide
        timeAdded
        timeLastSuccess
        timeLastFailed
        timesFailed
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
