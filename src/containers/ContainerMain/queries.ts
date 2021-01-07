import gql from 'graphql-tag';

export const IS_EXIST_LEARNING_SESSION_QUERY = gql`
  {
    isExistLearningSession
  }
`;

export const GET_ME_QUERY = gql`
  {
    me {
      firstName
      lastName
      id
    }
  }
`;
