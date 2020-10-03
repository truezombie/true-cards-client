import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IS_LOGGED_IN_QUERY } from '../../containers/App/queries';

import ROUTES from '../../constants/router';

// TODO: need move to containers
const PrivateRoute = (props: RouteProps): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);

  const { children, ...rest } = props;

  return (
    <Route
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      render={() =>
        data?.isLoggedIn ? (
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
