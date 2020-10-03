import React, { useEffect, useMemo } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useQuery, useLazyQuery } from '@apollo/client';
import { IS_EXIST_LEARNING_SESSION_QUERY, GET_ME_QUERY } from './queries';
import ROUTES from '../../constants/router';
import CONTACTS from '../../constants/contacts';
import { ContactListItem } from '../../types/app';
import { isLoggedInVar } from '../../cache';
import {
  AppToolBar,
  PageCards,
  PageCardSets,
  PageMessage,
  PageContacts,
} from '../../components';

import PageLearning from '../PageLearning';
import PageStartLearning from '../PageStartLearning';
import PageSettings from '../PageSettings';

const MainPage = (): JSX.Element => {
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

  const contactsList = useMemo<ContactListItem[]>(() => {
    return [
      {
        id: 1,
        labelName: <FormattedMessage id='contacts.list.label.email' />,
        label: CONTACTS.email,
        link: `mailto:${CONTACTS.email}`,
      },
      {
        id: 2,
        labelName: <FormattedMessage id='contacts.list.label.skype' />,
        label: CONTACTS.skype,
        link: `skype:${CONTACTS.skype}`,
      },
    ];
  }, [CONTACTS.skype, CONTACTS.email]);

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
            <PageStartLearning />
          </Route>
          <Route exact path={ROUTES.learning}>
            <PageLearning />
          </Route>
          <Route exact path={ROUTES.settings}>
            <PageSettings />
          </Route>
          <Route exact path={ROUTES.contacts}>
            <PageContacts contactsList={contactsList} />
          </Route>
        </>
      ) : null}
    </>
  );
};

export default MainPage;
