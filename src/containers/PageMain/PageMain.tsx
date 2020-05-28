import React from 'react';
import { Route } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AppToolBar, CardSets } from '../../components';
import {
  LIST_CARD_SETS_QUERY,
  CREATE_CARD_SET_QUERY,
  UPDATE_CARD_SET_QUERY,
  DELETE_CARD_SET_QUERY,
} from './queries';

const MainPage = () => {
  const { data, loading, refetch } = useQuery(LIST_CARD_SETS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [onCreateCardSet] = useMutation(CREATE_CARD_SET_QUERY, {
    onCompleted: () => refetch(),
  });

  const [onUpdateCardSet] = useMutation(UPDATE_CARD_SET_QUERY, {
    onCompleted: () => refetch(),
  });

  const [onDeleteCardSet] = useMutation(DELETE_CARD_SET_QUERY, {
    onCompleted: () => refetch(),
  });

  return (
    <>
      <AppToolBar />
      <Route exact path='/'>
        <CardSets
          isLoading={loading}
          onUpdateCardSet={onUpdateCardSet}
          onCreateCardSet={onCreateCardSet}
          onDeleteCardSet={onDeleteCardSet}
          listCardSets={(data && data.cardSets) || []}
        />
      </Route>
      <Route exact path='/cards/:id'>
        <h2>sdf</h2>
      </Route>
    </>
  );
};

export default MainPage;
