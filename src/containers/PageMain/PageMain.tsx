import React, { useEffect, useMemo } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  useMutation,
  useApolloClient,
  useLazyQuery,
} from '@apollo/react-hooks';
import {
  IS_EXIST_LEARNING_SESSION_QUERY,
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
import { CardsType, CardSetsType } from '../../types/app';
import {
  AppToolBar,
  PageStartLearning,
  PageCards,
  PageCardSets,
  PageLearning,
} from '../../components';

const MainPage = () => {
  const location = useLocation<{ pathname: String }>();
  const client = useApolloClient();

  const [
    getCardSets,
    {
      loading: loadingCardSets,
      refetch: refetchCardSets,
      data: dataCardSetsCards,
    },
  ] = useLazyQuery<CardSetsType>(LIST_CARD_SETS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
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
    fetchPolicy: 'no-cache',
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

  const [
    getStatusLearningSession,
    {
      data: statusLearningSessionData,
      loading: statusLearningSessionIsLoading,
    },
  ] = useLazyQuery(IS_EXIST_LEARNING_SESSION_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const onLogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    client.writeData({ data: { isLoggedIn: false } });
  };

  useEffect(() => {
    getStatusLearningSession();
  }, [location.pathname]);

  const hasActiveLearningSession = useMemo(() => {
    return (
      statusLearningSessionData?.isExistLearningSession &&
      !statusLearningSessionIsLoading &&
      location.pathname !== ROUTES.learning
    );
  }, [
    statusLearningSessionData?.isExistLearningSession,
    statusLearningSessionIsLoading,
    location.pathname,
  ]);

  const activeSessionAlert = useMemo(() => {
    return hasActiveLearningSession ? (
      <h1>У вас есть активная сессия</h1>
    ) : null;
  }, [hasActiveLearningSession]);

  return (
    <>
      <AppToolBar
        userMenuItems={[
          {
            id: 'logOut',
            text: <FormattedMessage id='btn.log.out' />,
            icon: <ExitToAppIcon />,
            onClick: onLogOut,
          },
        ]}
      />
      {activeSessionAlert}
      {!activeSessionAlert ? (
        <>
          <Route exact path={ROUTES.main}>
            <PageCardSets
              data={dataCardSetsCards}
              isLoading={loadingCardSets}
              onUpdateCardSet={onUpdateCardSet}
              onCreateCardSet={onCreateCardSet}
              onDeleteCardSet={onDeleteCardSet}
              getCardSets={getCardSets}
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
          <Route exact path={ROUTES.startLearning}>
            <PageStartLearning
              preLearningData={dataCardSetWithCards}
              getPreLearningData={getCardSetWithCards}
              preLearningDataIsLoading={loadingCardSetWithCards}
            />
          </Route>
          <Route exact path={ROUTES.learning}>
            <PageLearning />
          </Route>
        </>
      ) : null}
    </>
  );
};

export default MainPage;
