import gql from 'graphql-tag';

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
