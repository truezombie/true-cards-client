import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
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
  cardsLearned: number;
  cardsForgotten: number;
  cardsNew: number;
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
  cardsLearned,
  cardsForgotten,
  cardsNew,
}: CardSetProps) => {
  const cardsInfo = useMemo<
    {
      id: string;
      text: string | JSX.Element;
      value: number | string;
    }[]
  >(() => {
    return [
      {
        id: 'allCards',
        text: <FormattedMessage id='card.set.dashboard.all.cards' />,
        value: `${cardsAll} / ${cardsMax}`,
      },
      {
        id: 'learnedCards',
        text: <FormattedMessage id='card.set.dashboard.new.cards' />,
        value: cardsLearned,
      },
      {
        id: 'forgottenCards',
        text: <FormattedMessage id='card.set.dashboard.forgotten.cards' />,
        value: cardsForgotten,
      },
      {
        id: 'newCards',
        text: <FormattedMessage id='card.set.dashboard.learned.cards' />,
        value: cardsNew,
      },
    ];
  }, [cardsMax, cardsAll, cardsLearned, cardsForgotten, cardsNew]);

  return (
    <Paper className={classes.cardSetWrap}>
      <div className={classes.cardSet}>
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
          <Tooltip disableFocusListener title='Start to lern new cards'>
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

      <Divider className={classes.cardSetDivider} />

      <div className={classes.indicatorWrappers}>
        {cardsInfo.map((item) => {
          return (
            <div key={item.id} className={classes.indicator}>
              <Typography color='primary' variant='button' display='block'>
                {item.value}
              </Typography>
              <Typography
                color='textPrimary'
                variant='caption'
                display='block'
                align='center'
              >
                {item.text}
              </Typography>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default CardSet;
