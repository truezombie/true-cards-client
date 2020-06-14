import dayjs from 'dayjs';
import { CardType, CardsInfoType } from '../types/app';

// 1 its one day
export const SEED_OF_OBLIVION = 1; // TODO: need to be on the server it's temporary solution

export const getCardsInfo = (cards: CardType[]): CardsInfoType => {
  let res = {
    new: 0,
    forgotten: 0,
    learned: 0,
  };

  cards.forEach((item) => {
    const isNewCard = item.timesFailed === 0 && item.timesSuccess === 0;
    const isForgottenCard = dayjs(new Date()).isAfter(
      dayjs(item.timeLastSuccess).add(
        SEED_OF_OBLIVION * item.timeLastSuccess,
        'day'
      )
    );

    if (isNewCard) {
      res = {
        ...res,
        new: res.new + 1,
      };
    } else if (isForgottenCard) {
      res = {
        ...res,
        forgotten: res.forgotten + 1,
      };
    } else if (!isForgottenCard) {
      res = {
        ...res,
        learned: res.forgotten + 1,
      };
    }
  });

  return res;
};
