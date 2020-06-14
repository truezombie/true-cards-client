import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
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
  linkFolder: string;
  linkPlay: string;
  cardsMax: number;
  cardsAll: number;
  dropDownMenuItems: MenuItemProps[];
}

const CardSet = ({
  classes,
  name,
  dropDownMenuItems,
  linkFolder,
  linkPlay,
  cardsMax,
  cardsAll,
}: CardSetProps) => {
  return (
    <Paper className={classes.cardWrapper}>
      <div className={classes.card}>
        <Avatar className={classes.cardSetIco}>
          <FolderIcon />
        </Avatar>

        <div className={classes.cardTitleWrap}>
          <Link className={classes.cardSetLink} to={linkFolder}>
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
          <Tooltip disableFocusListener title='Start to study cards'>
            <Link to={linkPlay}>
              <IconButton aria-label='play'>
                <PlayCircleFilledIcon color='primary' />
              </IconButton>
            </Link>
          </Tooltip>
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
      </div>
      <Tooltip title={`${cardsAll}/${cardsMax}`} aria-label='cards-in-folder'>
        <LinearProgress
          classes={{
            bar: classes.barColorBg,
            colorPrimary: classes.barColorBufferBg,
          }}
          color='primary'
          variant='determinate'
          value={cardsAll}
        />
      </Tooltip>
    </Paper>
  );
};

export default CardSet;
