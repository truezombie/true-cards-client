import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ROUTES from '../../constants/router';
import { getCardsInfo } from '../../utils/cardsInfo';
import { CardsType, CardsInfoType } from '../../types/app';
import {
  WORDS_PER_LEARNING_SESSION,
  LEARNING_SESSION_TYPES,
} from './constants';

import styles from './styles';

export interface StartLearningParams {
  preLearningData?: CardsType;
  preLearningDataIsLoading: boolean;
  learningSessionIsLoading: boolean;
  onStartLearningSession: (data: {
    variables: {
      numberOfCards: number;
      cardSetId: string;
      sessionType: string;
    };
  }) => void;
}

interface StartLearningProps extends WithStyles<typeof styles> {}

const StartLearning = ({
  classes,
  preLearningData,
  onStartLearningSession,
}: StartLearningProps & StartLearningParams) => {
  const [wordsPerSession, setWordsPerSession] = useState<number>(
    WORDS_PER_LEARNING_SESSION[0]
  );

  const onClickLearningNewAndForgot = () => {
    if (preLearningData) {
      onStartLearningSession({
        variables: {
          numberOfCards: wordsPerSession,
          cardSetId: preLearningData.cardSetWithCards.id,
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
          cardSetId: preLearningData.cardSetWithCards.id,
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
          cardSetId: preLearningData.cardSetWithCards.id,
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
          cardSetId: preLearningData.cardSetWithCards.id,
          sessionType: LEARNING_SESSION_TYPES.LEARNED,
        },
      });
    }
  };

  const cardsInfo: CardsInfoType = useMemo(() => {
    return preLearningData
      ? getCardsInfo(preLearningData.cardSetWithCards.cards)
      : getCardsInfo([]);
  }, [preLearningData]);

  return preLearningData ? (
    <>
      <Link className={classes.title} to={ROUTES.main}>
        <ChevronLeftIcon className={classes.chevron} />
        <Typography variant='h5' display='block'>
          {preLearningData.cardSetWithCards.name}
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

      <Typography
        className={classes.values}
        color='textSecondary'
        variant='h3'
        align='center'
        component='p'
      >
        {cardsInfo.forgotten + cardsInfo.new}
      </Typography>

      <Button
        onClick={onClickLearningNewAndForgot}
        variant='contained'
        color='primary'
      >
        <FormattedMessage id='btn.learn.forgotten.and.new' />
      </Button>

      <Divider className={classes.divider} />

      <Grid container spacing={2}>
        <Grid className={classes.gridColumn} item xs={12} sm={4} md={4}>
          <Typography
            className={classes.values}
            color='textSecondary'
            variant='h4'
            align='center'
            component='p'
          >
            {cardsInfo.new}
          </Typography>
          <Button onClick={onClickNew} fullWidth color='primary' size='small'>
            <FormattedMessage id='btn.learn.new' />
          </Button>
        </Grid>

        <Grid className={classes.gridColumn} item xs={12} sm={4} md={4}>
          <Typography
            className={classes.values}
            color='textSecondary'
            variant='h4'
            align='center'
            component='p'
          >
            {cardsInfo.forgotten}
          </Typography>
          <Button
            onClick={onClickForgot}
            fullWidth
            color='primary'
            size='small'
          >
            <FormattedMessage id='btn.learn.forgotten' />
          </Button>
        </Grid>

        <Grid className={classes.gridColumn} item xs={12} sm={4} md={4}>
          <Typography
            className={classes.values}
            color='textSecondary'
            variant='h4'
            align='center'
            component='p'
          >
            {cardsInfo.learned}
          </Typography>
          <Button
            onClick={onClickLearned}
            fullWidth
            color='primary'
            size='small'
          >
            <FormattedMessage id='btn.learn.learned' />
          </Button>
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default StartLearning;
