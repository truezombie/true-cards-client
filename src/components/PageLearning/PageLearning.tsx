import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import ROUTES from '../../constants/router';
import Learning from '../Learning';
import { GET_CURRENT_LEARNING_CARD, SET_NEXT_LEARNING_CARD } from './queries';
import { hasError, ERROR_CODES } from '../../utils/errors';

const PageLearning = () => {
  const urlParams = useParams<{ id: string }>();

  const [
    getCurrentLoadingCard,
    {
      loading: currentLearningCardIsLoading,
      data: currentLearningCardData,
      refetch: refetchCurrentLearningCardData,
      error: currentLearningCardError,
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

  useEffect(() => {
    getCurrentLoadingCard({ variables: { cardSetId: urlParams.id } });
  }, []);

  const learningSessionError = useMemo(() => {
    return hasError(
      currentLearningCardError?.graphQLErrors,
      ERROR_CODES.ERROR_OUT_OF_CARDS
    );
  }, [currentLearningCardError]);

  return (
    <>
      {learningSessionError.hasError ? (
        <Redirect to={`${ROUTES.learningDone.replace(':id', urlParams.id)}`} />
      ) : (
        <Learning
          cardSetId={urlParams.id}
          setNextLearningCard={setNextLearningCard}
          currentLearningCardData={currentLearningCardData}
          currentLearningCardIsLoading={currentLearningCardIsLoading}
          nextLearningCardIsLoading={nextLearningCardIsLoading}
        />
      )}
    </>
  );
};

export default PageLearning;
