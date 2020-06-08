import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import { WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import Menu from '../Menu';

import { MenuItemProps } from '../../types/menu';

import styles from '../CardSets/styles';

interface CardSetProps extends WithStyles<typeof styles> {
  name: string;
  link: string;
  dropDownMenuItems: MenuItemProps[];
}

const CardSet = ({ classes, name, link, dropDownMenuItems }: CardSetProps) => {
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
        <IconButton aria-label='play' onClick={() => {}}>
          <PlayCircleFilledIcon color='primary' />
        </IconButton>
        <Menu items={dropDownMenuItems}>
          <IconButton
            aria-label='more'
            aria-controls='simple-menu'
            aria-haspopup='true'
          >
            <MoreVertIcon />
          </IconButton>
        </Menu>
      </div>
    </Paper>
  );
};

export default CardSet;
