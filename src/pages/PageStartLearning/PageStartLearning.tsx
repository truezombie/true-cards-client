import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Card from '@material-ui/core/Card';
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

type LearningMethods = {
  id: number;
  label: string | JSX.Element;
  cardsAmount: number;
  onClick: () => void;
};

const PageStartLearning = ({
  classes,
  preLearningData,
  onStartLearningSession,
}: PageStartLearningProps): JSX.Element | null => {
  const [wordsPerSession, setWordsPerSession] = useState<number>(
    WORDS_PER_LEARNING_SESSION[0]
  );
  const [learningMethod, setLearningMethod] = useState<number>(0);

  const cardsInfo: CardsInfoType = useMemo(() => {
    return preLearningData
      ? getCardsInfo(preLearningData.cards.cards)
      : getCardsInfo([]);
  }, [preLearningData]);

  const learnMethods: LearningMethods[] = [
    {
      id: 1,
      label: <FormattedMessage id='btn.learn.forgotten.and.new' />,
      cardsAmount: cardsInfo.forgotten + cardsInfo.new,
      onClick: () =>
        onStartLearningSession({
          variables: {
            numberOfCards: wordsPerSession,
            cardSetId: preLearningData.cards.cardSetId,
            sessionType: LEARNING_SESSION_TYPES.NEW_AND_FORGOT,
          },
        }),
    },
    {
      id: 2,
      label: <FormattedMessage id='btn.learn.new' />,
      cardsAmount: cardsInfo.new,
      onClick: () =>
        onStartLearningSession({
          variables: {
            numberOfCards: wordsPerSession,
            cardSetId: preLearningData.cards.cardSetId,
            sessionType: LEARNING_SESSION_TYPES.NEW,
          },
        }),
    },
    {
      id: 3,
      label: <FormattedMessage id='btn.learn.forgotten' />,
      cardsAmount: cardsInfo.forgotten,
      onClick: () =>
        onStartLearningSession({
          variables: {
            numberOfCards: wordsPerSession,
            cardSetId: preLearningData.cards.cardSetId,
            sessionType: LEARNING_SESSION_TYPES.FORGOT,
          },
        }),
    },
    {
      id: 4,
      label: <FormattedMessage id='btn.learn.learned' />,
      cardsAmount: cardsInfo.learned,
      onClick: () =>
        onStartLearningSession({
          variables: {
            numberOfCards: wordsPerSession,
            cardSetId: preLearningData.cards.cardSetId,
            sessionType: LEARNING_SESSION_TYPES.LEARNED,
          },
        }),
    },
    {
      id: 5,
      label: 'Repeat all cards',
      cardsAmount: 0, // TODO: need to add learning method
      onClick: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  ];

  return preLearningData ? (
    <>
      <Link className={classes.title} to={ROUTES.main}>
        <ChevronLeftIcon className={classes.chevron} />
        <Typography component='span' variant='subtitle1' display='block'>
          {preLearningData.cards.cardSetName}
        </Typography>
      </Link>

      <Card variant='outlined'>
        <CardContent>
          <Typography
            component='span'
            display='block'
            variant='h6'
            gutterBottom
            className={classes.cardTitle}
          >
            Learning preparation
          </Typography>
          <FormControl
            fullWidth
            size='small'
            variant='outlined'
            className={classes.input}
          >
            <InputLabel id='cards-per-session-input-label'>
              <FormattedMessage id='input.words.per.session' />
            </InputLabel>
            <Select
              labelId='cards-per-session-input-label'
              id='cards-per-session-input'
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

          <FormControl
            fullWidth
            size='small'
            variant='outlined'
            className={classes.input}
          >
            <InputLabel id='kind-of-session-input-label'>I want to:</InputLabel>
            <Select
              label='I want to:'
              labelId='kind-of-session-input-label'
              id='kind-of-session-input'
              value={learningMethod}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setLearningMethod(event.target.value as number);
              }}
            >
              {learnMethods.map((learnMethod, index) => {
                return (
                  <MenuItem
                    disabled={learnMethod.cardsAmount === 0}
                    key={learnMethod.id}
                    value={index}
                  >
                    {learnMethod.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button
            onClick={learnMethods[learningMethod].onClick}
            fullWidth
            variant='contained'
            color='primary'
            disabled={learnMethods[learningMethod].cardsAmount === 0}
          >
            Start
          </Button>
        </CardContent>
      </Card>
    </>
  ) : null;
};

export default PageStartLearning;
