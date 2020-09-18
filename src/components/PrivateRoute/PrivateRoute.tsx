import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import ROUTES from '../../constants/router';

interface PrivateRouteProps extends RouteProps {
  isLoggedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { children, isLoggedIn, ...rest } = props;

  return (
    <Route
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{ pathname: ROUTES.login, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
