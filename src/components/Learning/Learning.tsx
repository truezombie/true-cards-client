import React, { useState, useMemo } from 'react';
import cx from 'classnames';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CardContent from '@material-ui/core/CardContent';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import LinearProgress from '@material-ui/core/LinearProgress';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import { Loader } from '../Loader';

import { CurrentLearningCard } from '../../types/app';

import styles from './styles';

interface LearningProps extends WithStyles<typeof styles> {
  currentLearningCardData?: CurrentLearningCard;
  currentLearningCardIsLoading: boolean;
}

const Learning = ({
  classes,
  currentLearningCardIsLoading,
  currentLearningCardData,
}: LearningProps) => {
  const [isRotated, setRotated] = useState<boolean>(false);
  const { front = '', frontDescription, back, backDescription, hasBackSide } =
    (currentLearningCardData &&
      currentLearningCardData.getCurrentLearningCard) ||
    {};

  const onToggleRotateCard = () => {
    setRotated(!isRotated);
  };

  const onClickKnow = () => {
    setRotated(false);
  };

  const onClickSkip = () => {
    setRotated(false);
  };

  const loader = useMemo(() => {
    return currentLearningCardIsLoading ? <Loader /> : null;
  }, [currentLearningCardIsLoading]);

  return (
    <Container maxWidth='sm' className={classes.container}>
      {loader}
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
              <CardContent className={classes.cardBody}>
                <div>
                  <Typography
                    className={classes.cardInformation}
                    variant='h6'
                    component='p'
                    align='center'
                  >
                    {front}
                  </Typography>
                  <Typography
                    className={classes.cardDescription}
                    variant='body2'
                    component='p'
                    align='center'
                  >
                    {frontDescription}
                  </Typography>
                </div>
              </CardContent>
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
              <CardContent className={classes.cardBody}>
                <Typography
                  className={classes.cardInformation}
                  variant='h6'
                  component='p'
                  align='center'
                >
                  {back}
                </Typography>
                <Typography
                  className={classes.cardDescription}
                  variant='body2'
                  component='p'
                  align='center'
                >
                  {backDescription}
                </Typography>
              </CardContent>
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
                Rotate card
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                startIcon={<ThumbDownAltIcon />}
                onClick={onClickSkip}
              >
                I dont know
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                endIcon={<ThumbUpAltIcon />}
                onClick={onClickKnow}
              >
                I know
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Container>
  );
};

export default Learning;
