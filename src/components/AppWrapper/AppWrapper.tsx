import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useSnackbar } from 'notistack';

import { WithStyles } from '@material-ui/core/styles';

import { GRAPH_QL_ERRORS_QUERY } from '../../containers/App/queries';
import { getErrorMessage } from '../../utils/errors';

import styles from './styles';

interface AppWrapperProps extends WithStyles<typeof styles> {
  children: React.ReactChild;
}

const AppWrapper = ({ classes, children }: AppWrapperProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: errors = { graphQLErrors: [] } } = useQuery<{
    graphQLErrors: GraphQLError[];
  }>(GRAPH_QL_ERRORS_QUERY);

  useEffect(() => {
    errors.graphQLErrors.forEach((error) => {
      const errorMessage = getErrorMessage(error.message);

      if (errorMessage) {
        enqueueSnackbar(errorMessage);
      }
    });
  }, [enqueueSnackbar, errors]);

  return <div className={classes.wrapper}>{children}</div>;
};

export default AppWrapper;
