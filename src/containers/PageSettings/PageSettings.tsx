import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { Loader } from '../../components';
import FormForgettingFactor from './FormForgettingFactor';
import {
  GET_SETTING_PAGE_DATA_QUERY,
  UPDATE_FORGETTING_INDEX_QUERY,
} from './queries';
import { Me } from '../../types/app';

import styles from './styles';

type PageMessageProps = WithStyles<typeof styles>;

const PageMessage = ({ classes }: PageMessageProps): JSX.Element => {
  const {
    loading: settingsPageDataLoading,
    refetch: refetchSettingsPageData,
    data: settingsPageData = {
      me: {
        email: '',
        firstName: '',
        lastName: '',
        forgettingIndex: 0,
      },
    },
  } = useQuery<Me>(GET_SETTING_PAGE_DATA_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  const [onUpdateForgettingIndex] = useMutation(UPDATE_FORGETTING_INDEX_QUERY, {
    onCompleted: () => refetchSettingsPageData(),
  });

  return (
    <Container maxWidth='md' className={classes.container}>
      <Paper elevation={0} variant='outlined' className={classes.formContainer}>
        {settingsPageDataLoading ? (
          <div className={classes.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <>
            <Typography variant='h5' gutterBottom>
              Forgetting index
            </Typography>
            <Divider className={classes.divider} />
            <FormForgettingFactor
              forgettingIndex={Number(settingsPageData.me.forgettingIndex) || 0}
              onUpdateForgettingIndex={onUpdateForgettingIndex}
            />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default PageMessage;
