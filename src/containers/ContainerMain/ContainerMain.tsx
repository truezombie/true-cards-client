import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useQuery, useLazyQuery } from '@apollo/client';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Container from '@material-ui/core/Container';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import ROUTES from '../../constants/router';
import ContainerStartLearning from '../ContainerStartLearning';
import ContainerLearning from '../ContainerLearning';
import ContainerSettings from '../ContainerSettings';
import { AppToolBar } from '../../components';
import { PageCards, PageMessage, PageContacts } from '../../pages';
import { TabCardSets, TabCardSetsShared } from '../../pages/PageCardSets';
import { IS_EXIST_LEARNING_SESSION_QUERY, GET_ME_QUERY } from './queries';
import styles from './styles';

type PageCardSetsProps = WithStyles<typeof styles>;

const ContainerMain = ({ classes }: PageCardSetsProps): JSX.Element => {
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
      />
      {activeSessionAlert}
      {!activeSessionAlert ? (
        <>
          {location.pathname === ROUTES.main ||
          location.pathname === ROUTES.shared ? (
            <>
              <Tabs
                value={location.pathname}
                centered
                indicatorColor='primary'
                textColor='primary'
                aria-label='main tabs'
                className={classes.tabs}
              >
                <Tab
                  value={ROUTES.main}
                  to={ROUTES.main}
                  component={Link}
                  label='Сard sets'
                />
                <Tab
                  value={ROUTES.shared}
                  to={ROUTES.shared}
                  component={Link}
                  label='Shared card sets'
                />
              </Tabs>
              <Container className={classes.container} maxWidth='md'>
                <Route exact path={ROUTES.main}>
                  <TabCardSets userId={user?.me?.id} />
                </Route>
                <Route exact path={ROUTES.shared}>
                  <TabCardSetsShared />
                </Route>
              </Container>
            </>
          ) : null}

          <Route exact path={ROUTES.cards}>
            <PageCards />
          </Route>
          <Route exact path={ROUTES.startLearning}>
            <ContainerStartLearning />
          </Route>
          <Route exact path={ROUTES.learning}>
            <ContainerLearning />
          </Route>
          <Route exact path={ROUTES.contacts}>
            <PageContacts />
          </Route>
          <Route path={ROUTES.settings}>
            <ContainerSettings />
          </Route>
        </>
      ) : null}
    </>
  );
};

export default withStyles(styles)(ContainerMain);
