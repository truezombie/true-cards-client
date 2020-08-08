import gql from 'graphql-tag';

export const GET_CURRENT_LEARNING_CARD = gql`
  {
    getCurrentLearningCard {
      front
      frontDescription
      back
      backDescription
      hasBackSide
    }
  }
`;

export const SET_NEXT_LEARNING_CARD = gql`
  mutation($knowCurrentCard: Boolean!) {
    setNextLearningCard(knowCurrentCard: $knowCurrentCard)
  }
`;

export const RESET_LEARNING_SESSION = gql`
  {
    resetLearningSession
  }
`;
