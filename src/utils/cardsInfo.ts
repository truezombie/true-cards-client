import dayjs from 'dayjs';
import { CardType, CardsInfoType } from '../types/app';

// 1 its one day
export const SEED_OF_OBLIVION = 1; // TODO: need to be on the server it's temporary solution

export const isLearnedCard = (card: CardType): boolean => {
  return (
    card.timeLastSuccess !== 0 &&
    dayjs(new Date()).isAfter(
      dayjs(card.timeLastSuccess).add(
        SEED_OF_OBLIVION * card.timeLastSuccess,
        'day'
      )
    )
  );
};

export const isForgottenCard = (card: CardType): boolean => {
  return !isLearnedCard(card);
};

export const isNewCard = (card: CardType): boolean => {
  return card.timesSuccess === 0;
};

export const getCardsInfo = (cards: CardType[]): CardsInfoType => {
  let res = {
    new: 0,
    forgotten: 0,
    learned: 0,
  };

  cards.forEach((item) => {
    if (isNewCard(item)) {
      res = {
        ...res,
        new: res.new + 1,
      };
    } else if (isForgottenCard(item)) {
      res = {
        ...res,
        forgotten: res.forgotten + 1,
      };
    } else if (isLearnedCard(item)) {
      res = {
        ...res,
        learned: res.forgotten + 1,
      };
    }
  });

  return res;
};
