import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import ROUTES from '../../constants/router';

const PrivateRoute = (props: RouteProps) => {
  const { children, ...rest } = props;

  return (
    <Route
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      render={() =>
        localStorage.getItem('') ? (
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
