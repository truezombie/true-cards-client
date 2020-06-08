export type CardSetsType = {
  cardSets: {
    id: string;
    name: string;
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
