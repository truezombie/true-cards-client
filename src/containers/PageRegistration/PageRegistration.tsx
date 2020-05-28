import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { QUERY_TOKENS } from './queries';
import { Registration } from '../../components';

const PageRegistration = () => {
  const [mutate] = useMutation(QUERY_TOKENS);

  // TODO: confirm email

  return <Registration onSignUp={mutate} />;
};

export default PageRegistration;
