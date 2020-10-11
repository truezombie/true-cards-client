import React, { useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';

import { FullBlockMessage, Loader } from '../../components';
import { PageStartLearning } from '../../pages';
import ROUTES from '../../constants/router';
import { CardsType } from '../../types/app';
import { hasError, ERROR_CODES } from '../../utils/errors';

import { LIST_CARD_SET_WITH_CARDS_QUERY } from '../App/queries';
import { START_LEARNING_SESSION } from './queries';

import styles from './styles';

type ContainerStartLearningProps = WithStyles<typeof styles>;

const ContainerStartLearning = ({
  classes,
}: ContainerStartLearningProps): JSX.Element => {
  const urlParams = useParams<{ id: string }>();

  const { loading: preLearningDataIsLoading, data: preLearningData } = useQuery<
    CardsType
  >(LIST_CARD_SET_WITH_CARDS_QUERY, {
    variables: {
      cardSetId: urlParams.id,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  const [
    onStartLearningSession,
    {
      loading: learningSessionIsLoading,
      data: learningSessionData,
      error: learningSessionError,
    },
  ] = useMutation(START_LEARNING_SESSION);

  const loader = useMemo(() => {
    return preLearningDataIsLoading || learningSessionIsLoading ? (
      <Loader />
    ) : null;
  }, [preLearningDataIsLoading, learningSessionIsLoading]);

  const noData = useMemo(() => {
    return !preLearningData && !preLearningDataIsLoading ? (
      <FullBlockMessage message={<FormattedMessage id='no.data' />} />
    ) : null;
  }, [preLearningDataIsLoading, preLearningData]);

  const learningSessionAlreadyExist = useMemo(() => {
    return hasError(
      learningSessionError,
      ERROR_CODES.ERROR_LEARNING_SESSION_IS_NOT_EXIST
    );
  }, [learningSessionError]);

  return (
    <Container maxWidth='md' className={classes.container}>
      {loader}
      {noData}
      {learningSessionData && !learningSessionAlreadyExist.hasError ? (
        <Redirect to={ROUTES.learning} />
      ) : null}
      {preLearningData ? (
        <PageStartLearning
          preLearningData={preLearningData}
          onStartLearningSession={onStartLearningSession}
        />
      ) : null}
    </Container>
  );
};

export default ContainerStartLearning;
