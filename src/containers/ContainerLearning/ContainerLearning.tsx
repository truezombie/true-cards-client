import React, { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import ROUTES from '../../constants/router';
import { PageLearning, PageLearningDone } from '../../pages';
import {
  GET_CURRENT_LEARNING_CARD,
  SET_NEXT_LEARNING_CARD,
  RESET_LEARNING_SESSION,
} from './queries';
import { hasError, ERROR_CODES } from '../../utils/errors';
import { useSnackBarNotification } from '../../hooks';

const ContainerLearning = (): JSX.Element => {
  const [showErrorSnackBar] = useSnackBarNotification();
  const {
    loading: currentLearningCardIsLoading,
    data: currentLearningCardData,
    refetch: refetchCurrentLearningCardData,
    error: currentLearningCardError,
  } = useQuery(GET_CURRENT_LEARNING_CARD, {
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

  const learningSessionError = useMemo(() => {
    return hasError(currentLearningCardError, ERROR_CODES.ERROR_OUT_OF_CARDS);
  }, [currentLearningCardError]);

  const learningIsNotExist = useMemo(() => {
    return hasError(
      currentLearningCardError,
      ERROR_CODES.ERROR_LEARNING_SESSION_IS_NOT_EXIST
    );
  }, [currentLearningCardError]);

  useEffect(() => {
    showErrorSnackBar(
      ERROR_CODES.ERROR_LEARNING_SESSION_IS_NOT_EXIST,
      currentLearningCardError
    );
  }, [currentLearningCardError]);

  return (
    <>
      {learningIsNotExist.hasError ? <Redirect to={ROUTES.main} /> : null}
      {learningSessionError.hasError ? (
        <PageLearningDone
          onResetCurrentSession={onResetCurrentSession}
          link={ROUTES.main}
          message={<FormattedMessage id='learning.session.done.message' />}
          btnMessage={
            <FormattedMessage id='learning.session.done.btn.message' />
          }
        />
      ) : (
        <PageLearning
          setNextLearningCard={setNextLearningCard}
          currentLearningCardData={currentLearningCardData}
          currentLearningCardIsLoading={currentLearningCardIsLoading}
          nextLearningCardIsLoading={nextLearningCardIsLoading}
        />
      )}
    </>
  );
};

export default ContainerLearning;
