import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Loader, AppWrapper } from '../../components';
import ROUTES from '../../constants/router';

const PageLogin = lazy(() => import('../PageLogin'));
const PageRegistration = lazy(() => import('../PageRegistration'));
const PageForgotPassword = lazy(() => import('../PageForgotPassword'));
const PageMain = lazy(() => import('../PageMain'));

const theme = createMuiTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppWrapper>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={ROUTES.main} exact component={PageMain} />
              <Route path={ROUTES.login} component={PageLogin} />
              <Route path={ROUTES.registration} component={PageRegistration} />
              <Route
                path={ROUTES.forgotPassword}
                component={PageForgotPassword}
              />
            </Switch>
          </Suspense>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
