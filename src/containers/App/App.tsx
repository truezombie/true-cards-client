import React, { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';

import { Loader, AppWrapper, PrivateRoute } from '../../components';
import ROUTES from '../../constants/router';
import CONFIG from '../../utils/config';
import { IS_LOGGED_IN_QUERY } from './queries';

import theme from './theme';

import messagesEn from '../../translations/en.json';
import messagesRu from '../../translations/ru.json';
import messagesUa from '../../translations/ua.json';

const ContainerMain = lazy(() => import('../ContainerMain'));
const ContainerLogin = lazy(() => import('../ContainerLogin'));
const ContainerRegistration = lazy(() => import('../ContainerRegistration'));
const ContainerForgotPassword = lazy(
  () => import('../ContainerForgotPassword')
);
const ContainerConfirmRegistration = lazy(
  () => import('../ContainerConfirmRegistration')
);

const messages = {
  en: messagesEn,
  ru: messagesRu,
  ua: messagesUa,
};

const App = (): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);

  return (
    <IntlProvider locale='en' messages={messages.en}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={CONFIG.maxErrorMessages}>
          <AppWrapper>
            <Suspense fallback={<Loader />}>
              <Router>
                <Switch>
                  <Route path={ROUTES.login}>
                    <ContainerLogin />
                  </Route>
                  <Route path={ROUTES.registration} exact>
                    <ContainerRegistration />
                  </Route>
                  <Route path={ROUTES.registrationConfirm} exact>
                    <ContainerConfirmRegistration />
                  </Route>
                  <Route path={ROUTES.forgotPassword}>
                    <ContainerForgotPassword />
                  </Route>
                  <PrivateRoute
                    isLoggedIn={!!data?.isLoggedIn}
                    path={ROUTES.main}
                  >
                    <ContainerMain />
                  </PrivateRoute>
                </Switch>
              </Router>
            </Suspense>
          </AppWrapper>
        </SnackbarProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
