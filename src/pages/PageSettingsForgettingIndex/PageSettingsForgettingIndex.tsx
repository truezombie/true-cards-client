import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';

import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import { Loader } from '../../components';
import { Me } from '../../types/app';

import {
  GET_SETTING_PAGE_DATA_QUERY,
  UPDATE_FORGETTING_INDEX_QUERY,
} from './queries';
import FormForgettingFactor from './FormForgettingFactor';

import styles from './styles';

type PageSettingsForgettingIndexProps = WithStyles<typeof styles>;

const PageSettingsForgettingIndex = ({
  classes,
}: PageSettingsForgettingIndexProps): JSX.Element => {
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

  if (settingsPageDataLoading) {
    return (
      <div className={classes.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        <FormattedMessage id='settings.page.title.forgetting.index' />
      </Typography>
      <FormForgettingFactor
        forgettingIndex={Number(settingsPageData.me.forgettingIndex) || 0}
        onUpdateForgettingIndex={onUpdateForgettingIndex}
      />
    </>
  );
};

export default PageSettingsForgettingIndex;
