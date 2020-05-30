import React from 'react';
import { Route } from 'react-router-dom';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import { AppToolBar, CardSets } from '../../components';
import {
  LIST_CARD_SETS_QUERY,
  CREATE_CARD_SET_QUERY,
  UPDATE_CARD_SET_QUERY,
  DELETE_CARD_SET_QUERY,
} from './queries';
import ROUTES from '../../constants/router';

const MainPage = () => {
  const client = useApolloClient();

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

  const onLogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    client.writeData({ data: { isLoggedIn: false } });
  };

  return (
    <>
      <AppToolBar onLogOut={onLogOut} />
      <Route exact path={ROUTES.main}>
        <CardSets
          isLoading={loading}
          onUpdateCardSet={onUpdateCardSet}
          onCreateCardSet={onCreateCardSet}
          onDeleteCardSet={onDeleteCardSet}
          listCardSets={(data && data.cardSets) || []}
        />
      </Route>
      <Route exact path={ROUTES.cards}>
        <h2>sdf</h2>
      </Route>
    </>
  );
};

export default MainPage;
