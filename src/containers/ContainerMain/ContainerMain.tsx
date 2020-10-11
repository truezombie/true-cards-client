import React, { useEffect, useMemo } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useQuery, useLazyQuery } from '@apollo/client';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { IS_EXIST_LEARNING_SESSION_QUERY, GET_ME_QUERY } from './queries';
import ROUTES from '../../constants/router';
import { isLoggedInVar } from '../../cache';
import { AppToolBar } from '../../components';
import ContainerStartLearning from '../ContainerStartLearning';
import ContainerLearning from '../ContainerLearning';
import ContainerSettings from '../ContainerSettings';
import {
  PageCards,
  PageMessage,
  PageContacts,
  PageCardSets,
} from '../../pages';

const ContainerMain = (): JSX.Element => {
  const location = useLocation<{ pathname: string }>();
  const { data: user, loading: meIsLoading } = useQuery(GET_ME_QUERY);
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

    isLoggedInVar(false);
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
      <PageMessage
        link={ROUTES.learning}
        message={<FormattedMessage id='active.learning.session.message' />}
        btnMessage={
          <FormattedMessage id='active.learning.session.btn.message' />
        }
      />
    ) : null;
  }, [hasActiveLearningSession]);

  return (
    <>
      <AppToolBar
        meFirstName={user?.me?.firstName}
        meLastName={user?.me?.lastName}
        meIsLoading={meIsLoading}
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
            <PageCardSets />
          </Route>
          <Route exact path={ROUTES.cards}>
            <PageCards />
          </Route>
          <Route exact path={ROUTES.startLearning}>
            <ContainerStartLearning />
          </Route>
          <Route exact path={ROUTES.learning}>
            <ContainerLearning />
          </Route>
          <Route exact path={ROUTES.settings}>
            <ContainerSettings />
          </Route>
          <Route exact path={ROUTES.contacts}>
            <PageContacts />
          </Route>
        </>
      ) : null}
    </>
  );
};

export default ContainerMain;
