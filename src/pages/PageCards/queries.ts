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
        cardSetId: $cardSetId
        front: $front
        frontDescription: $frontDescription
        back: $back
        backDescription: $backDescription
        hasBackSide: $hasBackSide
      }
    )
  }
`;

export const UPDATE_CARD_QUERY = gql`
  mutation(
    $cardId: String!
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
      cardId: $cardId
    )
  }
`;

export const DELETE_CARD_QUERY = gql`
  mutation($cardId: String!) {
    deleteCard(cardId: $cardId)
  }
`;
