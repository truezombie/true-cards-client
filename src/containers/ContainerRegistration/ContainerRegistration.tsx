import React, { useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { QUERY_SET_PREREGISTRATION_EMAIL } from './queries';
import { useSnackBarNotification } from '../../hooks';
import { PageRegistration } from '../../pages';
import { ERROR_CODES } from '../../utils/errors';

const ContainerRegistration = (): JSX.Element => {
  const [showErrorSnackBar] = useSnackBarNotification();
  const [
    onSetPreRegistrationEmail,
    {
      data: preRegistrationData,
      loading: preRegistrationDataIsLoading,
      error: preRegistrationError,
    },
  ] = useMutation(QUERY_SET_PREREGISTRATION_EMAIL);

  const isEmailWasSend = useMemo(() => {
    return preRegistrationData?.setPreRegistrationEmail === 'OK';
  }, [preRegistrationData]);

  useEffect(() => {
    showErrorSnackBar(ERROR_CODES.ERROR_USER_EXIST, preRegistrationError);
  }, [preRegistrationError]);

  return (
    <PageRegistration
      isLoading={preRegistrationDataIsLoading}
      isEmailWasSend={isEmailWasSend}
      onSetPreRegistrationEmail={onSetPreRegistrationEmail}
    />
  );
};

export default ContainerRegistration;
