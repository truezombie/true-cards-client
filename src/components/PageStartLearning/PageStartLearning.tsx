import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';

import StartLearning, { StartLearningParams } from '../StartLearning';
import FullBlockMessage from '../FullBlockMessage';
import { Loader } from '../Loader';
import ROUTES from '../../constants/router';

import styles from './styles';

interface PageStartLearningProps extends WithStyles<typeof styles> {
  getPreLearningData: (data: { variables: { cardSetId: string } }) => void;
  learningSessionData?: { startLearningSession: string };
}

const PageStartLearning = ({
  classes,
  preLearningData,
  preLearningDataIsLoading,
  learningSessionIsLoading,
  learningSessionData,
  getPreLearningData,
  onStartLearningSession,
}: PageStartLearningProps & StartLearningParams) => {
  const [isLearningNow, setIsLearningNow] = useState<boolean>(false);
  const urlParams = useParams<{ id: string }>();

  const loader = useMemo(() => {
    return preLearningDataIsLoading ? <Loader /> : null;
  }, [preLearningDataIsLoading]);

  const noData = useMemo(() => {
    return !preLearningData && !preLearningDataIsLoading ? (
      <FullBlockMessage message={<FormattedMessage id='no.data' />} />
    ) : null;
  }, [preLearningDataIsLoading, preLearningData]);

  useEffect(() => {
    getPreLearningData({ variables: { cardSetId: urlParams.id } });
  }, []);

  useEffect(() => {
    if (learningSessionData && learningSessionData.startLearningSession) {
      setIsLearningNow(!isLearningNow);
    }
  }, [learningSessionData]);

  return (
    <Container maxWidth='md' className={classes.container}>
      {loader}
      {noData}
      {isLearningNow ? (
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
