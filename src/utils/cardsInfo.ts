import dayjs from 'dayjs';
import { CardProgress, CardsInfoType, CardType } from '../types/app';

// 1 its one day
export const SEED_OF_OBLIVION = 1; // TODO: need to be on the server it's temporary solution

export const getCardProgress = (card: CardType): CardProgress | undefined => {
  return card.progress[0];
};

export const isNewCard = (card: CardType): boolean => {
  return getCardProgress(card) === undefined;
};

export const isLearnedCard = (card: CardType): boolean => {
  const progress = getCardProgress(card);

  if (progress) {
    return dayjs(new Date()).isBefore(
      dayjs(progress.timeLastSuccess).add(
        SEED_OF_OBLIVION * progress.timesSuccess,
        'day'
      )
    );
  }

  return false;
};

export const isForgottenCard = (card: CardType): boolean => {
  return !isNewCard(card) && !isLearnedCard(card);
};

export const getCardsInfo = (cards: CardType[]): CardsInfoType => {
  let res = {
    new: 0,
    forgotten: 0,
    learned: 0,
  };

  cards.forEach((card) => {
    if (isNewCard(card)) {
      res = {
        ...res,
        new: res.new + 1,
      };
    } else if (isForgottenCard(card)) {
      res = {
        ...res,
        forgotten: res.forgotten + 1,
      };
    } else if (isLearnedCard(card)) {
      res = {
        ...res,
        learned: res.forgotten + 1,
      };
    }
  });

  return res;
};
