import gql from 'graphql-tag';

export const GET_CURRENT_LEARNING_CARD = gql`
  query($cardSetId: String!) {
    getCurrentLearningCard(cardSetId: $cardSetId) {
      front
      frontDescription
      back
      backDescription
      hasBackSide
    }
  }
`;

export const SET_NEXT_LEARNING_CARD = gql`
  mutation($knowCurrentCard: Boolean!, $cardSetId: String!) {
    setNextLearningCard(
      knowCurrentCard: $knowCurrentCard
      cardSetId: $cardSetId
    )
  }
`;
