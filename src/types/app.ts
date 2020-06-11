export type CardSetsType = {
  cardSets: {
    id: string;
    name: string;
    cardsMax: number;
    cardsAll: number;
    cardsLearned: number;
    cardsForgotten: number;
    cardsNew: number;
  }[];
};

export type CardType = {
  uuid: string;
  front: string;
  frontDescription?: string;
  back?: string;
  backDescription?: string;
  hasBackSide?: boolean;
};

export type CardsType = {
  cardSetWithCards: {
    id: string;
    name: string;
    cards: CardType[];
  };
};
