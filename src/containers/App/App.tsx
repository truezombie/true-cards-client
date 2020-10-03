import React, { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { Loader, AppWrapper, PrivateRoute } from '../../components';
import ROUTES from '../../constants/router';

import theme from './theme';

import messagesEn from '../../translations/en.json';
import messagesRu from '../../translations/ru.json';
import messagesUa from '../../translations/ua.json';

const PageMain = lazy(() => import('../PageMain'));
const PageLogin = lazy(() => import('../PageLogin'));
const PageRegistration = lazy(() => import('../PageRegistration'));
const PageForgotPassword = lazy(() => import('../PageForgotPassword'));
const PageConfirmRegistration = lazy(
  () => import('../PageConfirmRegistration')
);

const messages = {
  en: messagesEn,
  ru: messagesRu,
  ua: messagesUa,
};

const App = (): JSX.Element => {
  return (
    <IntlProvider locale='en' messages={messages.en}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper>
          <Router>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path={ROUTES.login}>
                  <PageLogin />
                </Route>
                <Route path={ROUTES.registration} exact>
                  <PageRegistration />
                </Route>
                <Route path={ROUTES.registrationConfirm} exact>
                  <PageConfirmRegistration />
                </Route>
                <Route path={ROUTES.forgotPassword}>
                  <PageForgotPassword />
                </Route>
                <PrivateRoute path={ROUTES.main}>
                  <PageMain />
                </PrivateRoute>
              </Switch>
            </Suspense>
          </Router>
        </AppWrapper>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
