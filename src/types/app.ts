export type Me = {
  me: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    forgettingIndex: string;
  };
};

export type CardSet = {
  id: string;
  name: string;
  cardsMax: number;
};

export type CardSetsType = {
  cardSets: {
    cardSets: CardSet[];
    count: number;
  };
};

export type CardType = {
  id: string;
  cardSetId: string;
  front: string;
  frontDescription?: string;
  back?: string;
  backDescription?: string;
  hasBackSide?: boolean;
  timeAdded: number;
  timeLastSuccess: number;
  timesSuccess: number;
};

export type CardsType = {
  cards: {
    cardSetId: string;
    cardSetName: string;
    cards: CardType[];
    count: number;
    cardsMax: number;
  };
};

export type CardsInfoType = {
  new: number;
  forgotten: number;
  learned: number;
};

export type CurrentLearningCard = {
  getCurrentLearningCard: {
    front: string;
    frontDescription: string;
    back: string;
    backDescription: string;
    hasBackSide: boolean;
    index: number;
    from: number;
  };
};

export type HasErrorObject = {
  message: string | null;
  hasError: boolean;
};

export type ContactListItem = {
  id: number;
  label: string;
  link: string;
  labelName: string | JSX.Element;
};
