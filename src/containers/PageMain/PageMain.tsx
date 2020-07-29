import React from 'react';
import { Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
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
  START_LEARNING_SESSION,
  GET_CURRENT_LEARNING_CARD,
  SET_NEXT_LEARNING_CARD,
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
    onStartLearningSession,
    { loading: learningSessionIsLoading, data: learningSessionData },
  ] = useMutation(START_LEARNING_SESSION);

  const [
    getCurrentLoadingCard,
    {
      loading: currentLearningCardIsLoading,
      data: currentLearningCardData,
      refetch: refetchCurrentLearningCardData,
    },
  ] = useLazyQuery(GET_CURRENT_LEARNING_CARD, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  const [
    setNextLearningCard,
    { loading: nextLearningCardIsLoading },
  ] = useMutation(SET_NEXT_LEARNING_CARD, {
    onCompleted: () => refetchCurrentLearningCardData(),
  });

  const onLogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    client.writeData({ data: { isLoggedIn: false } });
  };

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
          preLearningDataIsLoading={loadingCardSetWithCards}
          learningSessionData={learningSessionData}
          learningSessionIsLoading={learningSessionIsLoading}
          getPreLearningData={getCardSetWithCards}
          onStartLearningSession={onStartLearningSession}
        />
      </Route>
      <Route exact path={ROUTES.learning}>
        <PageLearning
          setNextLearningCard={setNextLearningCard}
          getCurrentLoadingCard={getCurrentLoadingCard}
          currentLearningCardData={currentLearningCardData}
          currentLearningCardIsLoading={currentLearningCardIsLoading}
          nextLearningCardIsLoading={nextLearningCardIsLoading}
        />
      </Route>
    </>
  );
};

export default MainPage;
