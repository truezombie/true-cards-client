import React, { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

import { Loader, AppWrapper, PrivateRoute } from '../../components';
import ROUTES from '../../constants/router';

import theme from './theme';

import messagesEn from '../../translations/en.json';
import messagesRu from '../../translations/ru.json';
import messagesUa from '../../translations/ua.json';

const PageLogin = lazy(() => import('../PageLogin'));
const PageRegistration = lazy(() => import('../PageRegistration'));
const PageForgotPassword = lazy(() => import('../PageForgotPassword'));
const PageMain = lazy(() => import('../PageMain'));

const messages = {
  en: messagesEn,
  ru: messagesRu,
  ua: messagesUa,
};

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn(): boolean {
  const { data } = useQuery(IS_LOGGED_IN);

  return data.isLoggedIn;
}

const App = () => {
  return (
    <IntlProvider locale='en' messages={messages.en}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper>
          <Router>
            <Suspense fallback={<Loader />}>
              <Switch>
                <PrivateRoute
                  isLoggedIn={IsLoggedIn()}
                  path={ROUTES.main}
                  exact
                >
                  <PageMain />
                </PrivateRoute>
                <Route path={ROUTES.login}>
                  <PageLogin />
                </Route>
                <Route path={ROUTES.registration}>
                  <PageRegistration />
                </Route>
                <Route path={ROUTES.forgotPassword}>
                  <PageForgotPassword />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </AppWrapper>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
