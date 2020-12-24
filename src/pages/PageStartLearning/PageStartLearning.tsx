import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { WithStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ROUTES from '../../constants/router';
import { getCardsInfo } from '../../utils/cardsInfo';
import { CardsType, CardsInfoType } from '../../types/app';
import {
  WORDS_PER_LEARNING_SESSION,
  LEARNING_SESSION_TYPES,
} from './constants';

import styles from './styles';

interface PageStartLearningProps extends WithStyles<typeof styles> {
  preLearningData: CardsType;
  onStartLearningSession: (data: {
    variables: {
      numberOfCards: number;
      cardSetId: string;
      sessionType: string;
    };
  }) => void;
}

const PageStartLearning = ({
  classes,
  preLearningData,
  onStartLearningSession,
}: PageStartLearningProps): JSX.Element | null => {
  const [wordsPerSession, setWordsPerSession] = useState<number>(
    WORDS_PER_LEARNING_SESSION[0]
  );

  const onClickLearningNewAndForgot = () => {
    if (preLearningData) {
      onStartLearningSession({
        variables: {
          numberOfCards: wordsPerSession,
          cardSetId: preLearningData.cards.cardSetId,
          sessionType: LEARNING_SESSION_TYPES.NEW_AND_FORGOT,
        },
      });
    }
  };

  const onClickNew = () => {
    if (preLearningData) {
      onStartLearningSession({
        variables: {
          numberOfCards: wordsPerSession,
          cardSetId: preLearningData.cards.cardSetId,
          sessionType: LEARNING_SESSION_TYPES.NEW,
        },
      });
    }
  };

  const onClickForgot = () => {
    if (preLearningData) {
      onStartLearningSession({
        variables: {
          numberOfCards: wordsPerSession,
          cardSetId: preLearningData.cards.cardSetId,
          sessionType: LEARNING_SESSION_TYPES.FORGOT,
        },
      });
    }
  };

  const onClickLearned = () => {
    if (preLearningData) {
      onStartLearningSession({
        variables: {
          numberOfCards: wordsPerSession,
          cardSetId: preLearningData.cards.cardSetId,
          sessionType: LEARNING_SESSION_TYPES.LEARNED,
        },
      });
    }
  };

  const cardsInfo: CardsInfoType = useMemo(() => {
    return preLearningData
      ? getCardsInfo(preLearningData.cards.cards)
      : getCardsInfo([]);
  }, [preLearningData]);

  return preLearningData ? (
    <>
      <Link className={classes.title} to={ROUTES.main}>
        <ChevronLeftIcon className={classes.chevron} />
        <Typography component='span' variant='subtitle1' display='block'>
          {preLearningData.cards.cardSetName}
        </Typography>
      </Link>

      <FormControl
        size='small'
        variant='outlined'
        className={classes.inputCardsPerSession}
      >
        <InputLabel id='demo-simple-select-outlined-label'>
          <FormattedMessage id='input.words.per.session' />
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={wordsPerSession}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setWordsPerSession(event.target.value as number);
          }}
          label={<FormattedMessage id='input.words.per.session' />}
        >
          {WORDS_PER_LEARNING_SESSION.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Typography variant='h5' gutterBottom>
        Learning
      </Typography>

      <Grid container spacing={2}>
        <Grid className={classes.gridColumn} item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                className={classes.values}
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.forgotten + cardsInfo.new}
              </Typography>

              <Button
                onClick={onClickLearningNewAndForgot}
                fullWidth
                size='small'
                variant='outlined'
                color='primary'
              >
                <FormattedMessage id='btn.learn.forgotten.and.new' />
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.gridColumn} item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                className={classes.values}
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.new}
              </Typography>
              <Button
                onClick={onClickNew}
                fullWidth
                size='small'
                variant='outlined'
                color='primary'
              >
                <FormattedMessage id='btn.learn.new' />
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid className={classes.gridColumn} item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                className={classes.values}
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.forgotten}
              </Typography>
              <Button
                onClick={onClickForgot}
                fullWidth
                size='small'
                variant='outlined'
                color='primary'
              >
                <FormattedMessage id='btn.learn.forgotten' />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography
        className={classes.typeOfStudyTitle}
        variant='h5'
        gutterBottom
      >
        Repeat
      </Typography>

      <Grid container spacing={2}>
        <Grid className={classes.gridColumn} item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                className={classes.values}
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.learned}
              </Typography>
              <Button
                onClick={onClickLearned}
                fullWidth
                size='small'
                variant='outlined'
                color='primary'
              >
                <FormattedMessage id='btn.learn.learned' />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default PageStartLearning;
