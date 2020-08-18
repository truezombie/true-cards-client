import React, { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import ROUTES from '../../constants/router';
import { Learning, LearningDone } from '../../components';
import {
  GET_CURRENT_LEARNING_CARD,
  SET_NEXT_LEARNING_CARD,
  RESET_LEARNING_SESSION,
} from './queries';
import { hasError, ERROR_CODES } from '../../utils/errors';

const PageLearning = () => {
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

  const [onResetCurrentSession] = useLazyQuery(RESET_LEARNING_SESSION);

  const [
    setNextLearningCard,
    { loading: nextLearningCardIsLoading },
  ] = useMutation(SET_NEXT_LEARNING_CARD, {
    onCompleted: () => refetchCurrentLearningCardData(),
  });

  useEffect(() => {
    getCurrentLoadingCard();
  }, []);

  const learningSessionError = useMemo(() => {
    return hasError(
      currentLearningCardError?.graphQLErrors,
      ERROR_CODES.ERROR_OUT_OF_CARDS
    );
  }, [currentLearningCardError]);

  const learningIsNotExist = useMemo(() => {
    return hasError(
      currentLearningCardError?.graphQLErrors,
      ERROR_CODES.ERROR_LEARNING_SESSION_IS_NOT_EXIST
    );
  }, [currentLearningCardError]);

  return (
    <>
      {learningIsNotExist.hasError ? <Redirect to={ROUTES.main} /> : null}
      {learningSessionError.hasError ? (
        <LearningDone
          onResetCurrentSession={onResetCurrentSession}
          link={ROUTES.main}
          message={<FormattedMessage id='learning.session.done.message' />}
          btnMessage={
            <FormattedMessage id='learning.session.done.btn.message' />
          }
        />
      ) : (
        <Learning
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
