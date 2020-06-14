import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Loader } from '../Loader';
import ROUTES from '../../constants/router';
import FullBlockMessage from '../FullBlockMessage';
import { getCardsInfo } from '../../utils/cardsInfo';
import { CardsType, CardsInfoType } from '../../types/app';

import styles from './styles';

interface PreStartProps extends WithStyles<typeof styles> {
  data?: CardsType;
  getPreLearningData: (data: { variables: { cardSetId: string } }) => void;
  isLoading: boolean;
}

const PreStart = ({
  classes,
  getPreLearningData,
  data,
  isLoading,
}: PreStartProps) => {
  const urlParams = useParams<{ id: string }>();

  useEffect(() => {
    getPreLearningData({ variables: { cardSetId: urlParams.id } });
  }, []);

  const cardsInfo: CardsInfoType = useMemo(() => {
    return data ? getCardsInfo(data.cardSetWithCards.cards) : getCardsInfo([]);
  }, [data]);

  const loader = useMemo(() => {
    return isLoading && !data ? <Loader /> : null;
  }, [isLoading, data]);

  const noData = useMemo(() => {
    return !data && !isLoading ? (
      <FullBlockMessage message={<FormattedMessage id='no.data' />} />
    ) : null;
  }, [isLoading, data]);

  return (
    <Container maxWidth='md' className={classes.container}>
      {loader}
      {noData}
      {data ? (
        <>
          <Link className={classes.title} to={ROUTES.main}>
            <ChevronLeftIcon className={classes.chevron} />
            <Typography variant='h5' display='block'>
              {data.cardSetWithCards.name}
            </Typography>
          </Link>

          <Typography
            className={classes.values}
            color='textSecondary'
            variant='h3'
            align='center'
            component='p'
          >
            {cardsInfo.forgotten + cardsInfo.new}
          </Typography>

          <Button variant='contained' color='primary'>
            Go through forgotten cards and learn new ones
          </Button>

          <Divider className={classes.divider} />

          <Typography
            className={classes.descriptionModes}
            color='textSecondary'
            align='center'
            component='p'
          >
            Не один из режимов представленных ниже не влияет на степень изучения
            карточки
          </Typography>

          <Grid container spacing={2}>
            <Grid className={classes.gridColumn} item xs={12} sm={6} md={3}>
              <Typography
                className={classes.values}
                color='textSecondary'
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.new}
              </Typography>
              <Button color='primary' size='small'>
                Перебрать новые карточки
              </Button>
            </Grid>

            <Grid className={classes.gridColumn} item xs={12} sm={6} md={3}>
              <Typography
                className={classes.values}
                color='textSecondary'
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.forgotten}
              </Typography>
              <Button color='primary' size='small'>
                Перебрать забытые карточки
              </Button>
            </Grid>

            <Grid className={classes.gridColumn} item xs={12} sm={6} md={3}>
              <Typography
                className={classes.values}
                color='textSecondary'
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.learned}
              </Typography>
              <Button color='primary' size='small'>
                Перебрать изученные карточки
              </Button>
            </Grid>

            <Grid className={classes.gridColumn} item xs={12} sm={6} md={3}>
              <Typography
                className={classes.values}
                color='textSecondary'
                variant='h4'
                align='center'
                component='p'
              >
                {cardsInfo.new + cardsInfo.forgotten}
              </Typography>
              <Button color='primary' size='small'>
                Перебрать новые и забытые карточки
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Container>
  );
};

export default PreStart;
