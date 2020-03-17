import React, { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { Loader, AppWrapper } from '../../components';
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

const App = () => {
  return (
    <IntlProvider locale='en' messages={messages.en}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper>
          <Router>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path={ROUTES.main} exact component={PageMain} />
                <Route path={ROUTES.login} component={PageLogin} />
                <Route
                  path={ROUTES.registration}
                  component={PageRegistration}
                />
                <Route
                  path={ROUTES.forgotPassword}
                  component={PageForgotPassword}
                />
              </Switch>
            </Suspense>
          </Router>
        </AppWrapper>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
