import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import { Loader } from '../../components';

import FormPersonalDataChanging from './FormPersonalDataChanging';
import {
  GET_SETTING_PAGE_DATA_QUERY,
  UPDATE_PERSONAL_DATA_QUERY,
} from './queries';

import styles from './styles';

type PageSettingsPersonalDataProps = WithStyles<typeof styles>;

const PageSettingsPersonalData = ({
  classes,
}: PageSettingsPersonalDataProps): JSX.Element => {
  const {
    loading: settingsPageDataLoading,
    refetch: refetchSettingsPageData,
    data: settingsPageData = {
      me: {
        firstName: '',
        lastName: '',
      },
    },
  } = useQuery<{ me: { firstName: string; lastName: string } }>(
    GET_SETTING_PAGE_DATA_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
    }
  );

  const [onUpdatePersonalData] = useMutation(UPDATE_PERSONAL_DATA_QUERY, {
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
      <Typography component='span' display='block' variant='h6' gutterBottom>
        <FormattedMessage id='settings.page.title.personal.data' />
      </Typography>
      <FormPersonalDataChanging
        firstName={settingsPageData.me.firstName}
        lastName={settingsPageData.me.lastName}
        onUpdatePersonalData={onUpdatePersonalData}
      />
    </>
  );
};

export default PageSettingsPersonalData;
