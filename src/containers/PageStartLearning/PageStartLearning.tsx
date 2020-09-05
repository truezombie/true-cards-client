import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/react-hooks';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';

import { StartLearning, FullBlockMessage, Loader } from '../../components';
import ROUTES from '../../constants/router';
import { CardsType } from '../../types/app';
import { hasError, ERROR_CODES } from '../../utils/errors';

import { START_LEARNING_SESSION } from './queries';

import styles from './styles';

interface PageStartLearningProps extends WithStyles<typeof styles> {
  getPreLearningData: (data: { variables: { cardSetId: string } }) => void;
  preLearningData?: CardsType;
  preLearningDataIsLoading: boolean;
}

const PageStartLearning = ({
  classes,
  preLearningData,
  preLearningDataIsLoading,
  getPreLearningData,
}: PageStartLearningProps) => {
  const urlParams = useParams<{ id: string }>();

  const [
    onStartLearningSession,
    {
      loading: learningSessionIsLoading,
      data: learningSessionData,
      error: learningSessionError,
    },
  ] = useMutation(START_LEARNING_SESSION);

  useEffect(() => {
    getPreLearningData({ variables: { cardSetId: urlParams.id } });
  }, []);

  const loader = useMemo(() => {
    return preLearningDataIsLoading ? <Loader /> : null;
  }, [preLearningDataIsLoading]);

  const noData = useMemo(() => {
    return !preLearningData && !preLearningDataIsLoading ? (
      <FullBlockMessage message={<FormattedMessage id='no.data' />} />
    ) : null;
  }, [preLearningDataIsLoading, preLearningData]);

  const learningSessionAlreadyExist = useMemo(() => {
    return hasError(
      learningSessionError?.graphQLErrors,
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
        <StartLearning
          preLearningData={preLearningData}
          preLearningDataIsLoading={preLearningDataIsLoading}
          learningSessionIsLoading={learningSessionIsLoading}
          onStartLearningSession={onStartLearningSession}
        />
      ) : null}
    </Container>
  );
};

PageStartLearning.defaultProps = {
  preLearningData: null,
};

export default PageStartLearning;
