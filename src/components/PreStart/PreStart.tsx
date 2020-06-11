import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';

import ROUTES from '../../constants/router';

import styles from './styles';

interface PreStartProps extends WithStyles<typeof styles> {}

const PreStart = ({ classes }: PreStartProps) => {
  return (
    <Container maxWidth='md' className={classes.container}>
      <Link className={classes.title} to={ROUTES.main}>
        <ChevronLeftIcon className={classes.chevron} />
        <Typography variant='h5' display='block'>
          fruits
        </Typography>
      </Link>

      <Typography
        className={classes.values}
        color='textSecondary'
        variant='h3'
        align='center'
        component='p'
      >
        34
      </Typography>

      <Button variant='contained' color='primary'>
        Повторить забытое и выучить новое
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
            34
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
            3
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
            29
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
            34
          </Typography>
          <Button color='primary' size='small'>
            Перебрать новые и забытые карточки
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PreStart;
