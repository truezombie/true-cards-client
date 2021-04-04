import React from 'react';
import { IntlProvider } from 'react-intl';
import Loadable from 'react-loadable';
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

const ContainerMain = Loadable({
  loader: () => import('../ContainerMain'),
  loading() {
    return <Loader />;
  },
});

const ContainerLogin = Loadable({
  loader: () => import('../ContainerLogin/ContainerLogin'),
  loading() {
    return <Loader />;
  },
});

const ContainerRegistration = Loadable({
  loader: () => import('../ContainerRegistration/ContainerRegistration'),
  loading() {
    return <Loader />;
  },
});

const ContainerForgotPassword = Loadable({
  loader: () => import('../ContainerForgotPassword/ContainerForgotPassword'),
  loading() {
    return <Loader />;
  },
});

const ContainerConfirmRegistration = Loadable({
  loader: () =>
    import('../ContainerConfirmRegistration/ContainerConfirmRegistration'),
  loading() {
    return <Loader />;
  },
});

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
          </AppWrapper>
        </SnackbarProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
