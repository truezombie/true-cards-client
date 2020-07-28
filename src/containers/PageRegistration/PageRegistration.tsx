import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { QUERY_TOKENS } from './queries';
import { PageRegistration } from '../../components';

const Registration = () => {
  const [mutate] = useMutation(QUERY_TOKENS);

  // TODO: confirm email

  return <PageRegistration onSignUp={mutate} />;
};

export default Registration;
