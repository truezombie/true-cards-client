import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  isLearnedCard,
  isNewCard,
  isForgottenCard,
} from '../../utils/cardsInfo';
import { CardType } from '../../types/app';

type CardStatusProps = {
  card: CardType;
};

const CardStatus = ({ card }: CardStatusProps): JSX.Element => {
  if (isNewCard(card)) {
    return <FormattedMessage id='card.status.new' />;
  }

  if (isForgottenCard(card)) {
    return <FormattedMessage id='card.status.forgot' />;
  }

  if (isLearnedCard(card)) {
    return <FormattedMessage id='card.status.learned' />;
  }

  return <FormattedMessage id='card.status.not.found' />;
};

export default CardStatus;
