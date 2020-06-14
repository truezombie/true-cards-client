export type CardSetsType = {
  cardSets: {
    id: string;
    name: string;
    cardsMax: number;
    cardsAll: number;
  }[];
};

export type CardType = {
  uuid: string;
  front: string;
  frontDescription?: string;
  back?: string;
  backDescription?: string;
  hasBackSide?: boolean;
  timeAdded: number;
  timeLastSuccess: number;
  timeLastFailed: number;
  timesFailed: number;
  timesSuccess: number;
};

export type CardsType = {
  cardSetWithCards: {
    id: string;
    name: string;
    cards: CardType[];
  };
};

export type CardsInfoType = {
  new: number;
  forgotten: number;
  learned: number;
};
