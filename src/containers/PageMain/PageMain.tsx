import React from 'react';
import { Route } from 'react-router-dom';
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
} from '@apollo/react-hooks';
import {
  LIST_CARD_SETS_QUERY,
  LIST_CARD_SET_WITH_CARDS_QUERY,
  CREATE_CARD_SET_QUERY,
  UPDATE_CARD_SET_QUERY,
  DELETE_CARD_SET_QUERY,
  CREATE_CARD_QUERY,
  UPDATE_CARD_QUERY,
  DELETE_CARD_QUERY,
} from './queries';
import ROUTES from '../../constants/router';
import { CardsType, CardSetsType } from '../../types';
import { AppToolBar } from '../../components';
import PageCardSets from '../../components/CardSets';
import PageCards from '../../components/Cards';

const MainPage = () => {
  const client = useApolloClient();

  const {
    data: dataCardSets,
    loading: loadingCardSets,
    refetch: refetchCardSets,
  } = useQuery<CardSetsType>(LIST_CARD_SETS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    getCardSetWithCards,
    {
      called: calledCardSetWithCards,
      loading: loadingCardSetWithCards,
      refetch: refetchCardSetWithCards,
      data: dataCardSetWithCards,
    },
  ] = useLazyQuery<CardsType>(LIST_CARD_SET_WITH_CARDS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [onCreateCardSet] = useMutation(CREATE_CARD_SET_QUERY, {
    onCompleted: () => refetchCardSets(),
  });

  const [onUpdateCardSet] = useMutation(UPDATE_CARD_SET_QUERY, {
    onCompleted: () => refetchCardSets(),
  });

  const [onDeleteCardSet] = useMutation(DELETE_CARD_SET_QUERY, {
    onCompleted: () => refetchCardSets(),
  });

  const [onCreateCard] = useMutation(CREATE_CARD_QUERY, {
    onCompleted: () => refetchCardSetWithCards(),
  });

  const [onUpdateCard] = useMutation(UPDATE_CARD_QUERY, {
    onCompleted: () => refetchCardSetWithCards(),
  });

  const [onDeleteCard] = useMutation(DELETE_CARD_QUERY, {
    onCompleted: () => refetchCardSetWithCards(),
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
        <PageCardSets
          data={dataCardSets}
          isLoading={loadingCardSets}
          onUpdateCardSet={onUpdateCardSet}
          onCreateCardSet={onCreateCardSet}
          onDeleteCardSet={onDeleteCardSet}
        />
      </Route>
      <Route exact path={ROUTES.cards}>
        <PageCards
          data={dataCardSetWithCards}
          isLoading={loadingCardSetWithCards}
          onCreateCard={onCreateCard}
          onUpdateCard={onUpdateCard}
          onDeleteCard={onDeleteCard}
          calledCardSetWithCards={calledCardSetWithCards}
          getCardSetWithCards={getCardSetWithCards}
        />
      </Route>
    </>
  );
};

export default MainPage;
