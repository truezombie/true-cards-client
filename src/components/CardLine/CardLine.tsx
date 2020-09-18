import React from 'react';
import { WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

interface CardLineProps extends WithStyles<typeof styles> {
  front: string;
  status: JSX.Element;
  back?: string;
  onDelete: () => void;
  onEdit: () => void;
}

const CardLine = ({
  classes,
  front,
  back,
  status,
  onDelete,
  onEdit,
}: CardLineProps): JSX.Element => {
  return (
    <Paper elevation={0} variant='outlined' className={classes.card}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={2}
      >
        <Grid xs={4} zeroMinWidth item>
          <Typography title={front} variant='body2' noWrap>
            {front}
          </Typography>
        </Grid>
        <Grid xs={4} zeroMinWidth item>
          <Typography title={back} variant='body2' noWrap>
            {back}
          </Typography>
        </Grid>
        <Grid xs={2} zeroMinWidth item>
          <Typography variant='body2' noWrap>
            {status}
          </Typography>
        </Grid>
        <Grid xs={2} item className={classes.actions}>
          <>
            <IconButton onClick={onEdit} aria-label='edit'>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton onClick={onDelete} aria-label='delete'>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </>
        </Grid>
      </Grid>
    </Paper>
  );
};

CardLine.defaultProps = {
  back: '',
};

export default CardLine;
