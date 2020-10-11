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
