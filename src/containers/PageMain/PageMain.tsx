import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Loader } from '../../components';

const QUERY_LIST_CARD_SETS = gql`
  {
    cardSets {
      id
      name
    }
  }
`;

const MainPage = () => {
  const { data, loading, error } = useQuery(QUERY_LIST_CARD_SETS);

  console.log(data, error); // eslint-disable-line

  return loading ? <Loader /> : <p>Main page</p>;
};

export default MainPage;
