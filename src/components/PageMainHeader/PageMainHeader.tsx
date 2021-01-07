import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import styles from './styles';

interface PageMainHeaderProps extends WithStyles<typeof styles> {
  onAdd?: () => void;
  msgAddBtn?: JSX.Element | string;
  msgTitle: JSX.Element | string;
  link?: string | null;
  currentValue?: number | null;
  maxValue?: number | null;
}

const PageMainHeader = ({
  classes,
  onAdd,
  link,
  msgTitle,
  msgAddBtn,
  currentValue,
  maxValue,
}: PageMainHeaderProps): JSX.Element => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {link ? (
            <Link className={classes.headerTitleLink} to={link}>
              <ChevronLeftIcon className={classes.chevron} />
              <Typography component='span' variant='subtitle1' display='block'>
                {msgTitle}
              </Typography>
            </Link>
          ) : (
            <Typography component='span' variant='subtitle1' display='block'>
              {msgTitle}
            </Typography>
          )}
        </div>

        {currentValue === 0 || (currentValue && maxValue) ? (
          <Typography variant='button' display='block'>
            {`${currentValue} / ${maxValue}`}
          </Typography>
        ) : null}

        {onAdd && msgAddBtn ? (
          <div className={classes.headerBtn}>
            <Button
              onClick={onAdd}
              variant='contained'
              color='secondary'
              startIcon={<AddIcon />}
              disableElevation
            >
              {msgAddBtn}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

PageMainHeader.defaultProps = {
  link: null,
  currentValue: null,
  maxValue: null,
  onAdd: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  msgAddBtn: '',
};

export default PageMainHeader;
