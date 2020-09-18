import React, { useEffect } from 'react';

import { WithStyles } from '@material-ui/core/styles';

import PageMessage from '../PageMessage';

import styles from './styles';

interface LearningDoneProps extends WithStyles<typeof styles> {
  message: string | JSX.Element;
  btnMessage: string | JSX.Element;
  link: string;
  onResetCurrentSession: () => void;
}

const LearningDone = ({
  onResetCurrentSession,
  link,
  btnMessage,
  message,
}: LearningDoneProps): JSX.Element => {
  useEffect(() => {
    onResetCurrentSession();
  }, []);

  return <PageMessage message={message} btnMessage={btnMessage} link={link} />;
};

export default LearningDone;
