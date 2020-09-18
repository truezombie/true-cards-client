import React, { useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { QUERY_SET_PREREGISTRATION_EMAIL } from './queries';

import { PageRegistration } from '../../components';

const Registration = (): JSX.Element => {
  const [
    onSetPreRegistrationEmail,
    { data: preRegistrationData, loading: preRegistrationDataIsLoading },
  ] = useMutation(QUERY_SET_PREREGISTRATION_EMAIL);

  const isEmailWasSend = useMemo(() => {
    return preRegistrationData?.setPreRegistrationEmail === 'OK';
  }, [preRegistrationData]);

  return (
    <PageRegistration
      isLoading={preRegistrationDataIsLoading}
      isEmailWasSend={isEmailWasSend}
      onSetPreRegistrationEmail={onSetPreRegistrationEmail}
    />
  );
};

export default Registration;
