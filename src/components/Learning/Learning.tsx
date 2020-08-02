import React, { useState, useMemo, useEffect } from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import LinearProgress from '@material-ui/core/LinearProgress';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import { Loader } from '../Loader';
import CardSide from '../CardSide';

import { CurrentLearningCard } from '../../types/app';

import styles from './styles';

interface LearningProps extends WithStyles<typeof styles> {
  setNextLearningCard: (data: {
    variables: { cardSetId: string; knowCurrentCard: boolean };
  }) => void;
  currentLearningCardData?: CurrentLearningCard;
  currentLearningCardIsLoading: boolean;
  cardSetId: string;
  nextLearningCardIsLoading: boolean;
}

const Learning = ({
  classes,
  cardSetId,
  setNextLearningCard,
  currentLearningCardIsLoading,
  currentLearningCardData,
  nextLearningCardIsLoading,
}: LearningProps) => {
  const [isRotated, setRotated] = useState<boolean>(false);
  const [isDisabledNewCardButtons, setDisabledNewCardButtons] = useState<
    boolean
  >(false);

  const { front = '', frontDescription, back, backDescription, hasBackSide } =
    (currentLearningCardData &&
      currentLearningCardData.getCurrentLearningCard) ||
    {};

  const onToggleRotateCard = () => {
    setRotated(!isRotated);
  };

  const onClickKnow = () => {
    setRotated(false);
    setDisabledNewCardButtons(true);
    setNextLearningCard({ variables: { knowCurrentCard: true, cardSetId } });
  };

  const onClickForgot = () => {
    setRotated(false);
    setDisabledNewCardButtons(true);
    setNextLearningCard({ variables: { knowCurrentCard: false, cardSetId } });
  };

  const loader = useMemo(() => {
    return currentLearningCardIsLoading || nextLearningCardIsLoading ? (
      <Loader />
    ) : null;
  }, [currentLearningCardIsLoading]);

  useEffect(() => {
    setDisabledNewCardButtons(false);
  }, [currentLearningCardData]);

  return (
    <Container maxWidth='sm' className={classes.container}>
      {!currentLearningCardData && !currentLearningCardData && loader}
      {currentLearningCardData ? (
        <>
          <Tooltip title={`${3}/${5}`}>
            <LinearProgress
              className={classes.progress}
              variant='determinate'
              value={50}
            />
          </Tooltip>

          <div className={classes.cardsWrapper}>
            <Card
              className={cx(
                {
                  [classes.rotateCardFrontSide]: isRotated,
                },
                classes.card,
                classes.cardFrontSide
              )}
            >
              {loader || (
                <CardSide message={front} description={frontDescription} />
              )}
            </Card>
            <Card
              className={cx(
                {
                  [classes.rotateCardBackSide]: isRotated,
                },
                classes.card,
                classes.cardBackSide
              )}
            >
              {loader || (
                <CardSide message={back} description={backDescription} />
              )}
            </Card>
          </div>

          <Grid className={classes.buttonsGrid} container spacing={2}>
            <Grid item xs={12}>
              <Button
                disabled={!hasBackSide}
                onClick={onToggleRotateCard}
                fullWidth
                color='primary'
                startIcon={<AutorenewIcon />}
              >
                <FormattedMessage id='rotate.card' />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                disabled={isDisabledNewCardButtons || !!loader}
                startIcon={<ThumbDownAltIcon />}
                onClick={onClickForgot}
              >
                <FormattedMessage id='btn.dont.know' />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                disabled={isDisabledNewCardButtons || !!loader}
                endIcon={<ThumbUpAltIcon />}
                onClick={onClickKnow}
              >
                <FormattedMessage id='btn.know' />
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Container>
  );
};

export default Learning;
