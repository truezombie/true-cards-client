import React, { useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/react-hooks';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';

import StartLearning from '../StartLearning';
import FullBlockMessage from '../FullBlockMessage';
import { Loader } from '../Loader';
import ROUTES from '../../constants/router';
import { CardsType } from '../../types/app';

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
    { loading: learningSessionIsLoading, data: learningSessionData },
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

  return (
    <Container maxWidth='md' className={classes.container}>
      {loader}
      {noData}
      {learningSessionData ? (
        <Redirect to={`${ROUTES.learning.replace(':id', urlParams.id)}`} />
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

export default PageStartLearning;
