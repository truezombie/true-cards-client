import gql from 'graphql-tag';

// eslint-disable-next-line
export const START_LEARNING_SESSION = gql`
  mutation($numberOfCards: Int!, $cardSetId: String!, $sessionType: String!) {
    startLearningSession(
      numberOfCards: $numberOfCards
      cardSetId: $cardSetId
      sessionType: $sessionType
    )
  }
`;
