import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CurrentLearningCard } from '../../types/app';

import Learning from '../Learning';

interface PageLearningProps {
  setNextLearningCard: (data: {
    variables: { cardSetId: string; konwCurrentCard: boolean };
  }) => void;
  getCurrentLoadingCard: (data: { variables: { cardSetId: string } }) => void;
  currentLearningCardData: CurrentLearningCard;
  currentLearningCardIsLoading: boolean;
  nextLearningCardIsLoading: boolean;
}

const PageLearning = ({
  setNextLearningCard,
  getCurrentLoadingCard,
  currentLearningCardData,
  currentLearningCardIsLoading,
  nextLearningCardIsLoading,
}: PageLearningProps) => {
  const urlParams = useParams<{ id: string }>();

  useEffect(() => {
    getCurrentLoadingCard({ variables: { cardSetId: urlParams.id } });
  }, []);

  return (
    <Learning
      cardSetId={urlParams.id}
      setNextLearningCard={setNextLearningCard}
      currentLearningCardData={currentLearningCardData}
      currentLearningCardIsLoading={currentLearningCardIsLoading}
      nextLearningCardIsLoading={nextLearningCardIsLoading}
    />
  );
};

export default PageLearning;
