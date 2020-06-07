import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { WithStyles } from '@material-ui/core/styles';
import styles from '../CardSets/styles';

interface CardSetProps extends WithStyles<typeof styles> {
  name: string;
  link: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CardSet = ({ classes, name, link, onEdit, onDelete }: CardSetProps) => {
  return (
    <Paper className={classes.cardSet}>
      <Avatar className={classes.cardSetIco}>
        <FolderIcon />
      </Avatar>
      <div className={classes.cardTitleWrap}>
        <Link className={classes.cardSetLink} to={link}>
          <Typography
            title={name}
            className={classes.cardSetTitle}
            variant='button'
            display='block'
            gutterBottom
          >
            {name}
          </Typography>
        </Link>
      </div>
      <div className={classes.cardButtonsWrap}>
        <IconButton onClick={onEdit} aria-label='edit'>
          <EditIcon fontSize='inherit' />
        </IconButton>
        <IconButton onClick={onDelete} aria-label='delete'>
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </div>
    </Paper>
  );
};

export default CardSet;
