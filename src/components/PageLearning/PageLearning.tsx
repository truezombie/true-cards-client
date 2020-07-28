import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CurrentLearningCard } from '../../types/app';

import Learning from '../Learning';

interface PageLearningProps {
  getCurrentLoadingCard: (data: { variables: { cardSetId: string } }) => void;
  currentLearningCardData: CurrentLearningCard;
  currentLearningCardIsLoading: boolean;
}

const PageLearning = ({
  getCurrentLoadingCard,
  currentLearningCardData,
  currentLearningCardIsLoading,
}: PageLearningProps) => {
  const urlParams = useParams<{ id: string }>();

  useEffect(() => {
    getCurrentLoadingCard({ variables: { cardSetId: urlParams.id } });
  }, []);

  return (
    <Learning
      currentLearningCardData={currentLearningCardData}
      currentLearningCardIsLoading={currentLearningCardIsLoading}
    />
  );
};

export default PageLearning;
