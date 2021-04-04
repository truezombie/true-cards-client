import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import styles from './styles';

interface PageMainHeaderProps extends WithStyles<typeof styles> {
  onAdd?: () => void;
  msgAddBtn?: string;
  msgTitle: string;
  link?: string | undefined;
  currentValue?: number | undefined;
  maxValue?: number | undefined;
  isDisabledAddBtn?: boolean | undefined;
}

const PageMainHeader = ({
  classes,
  onAdd,
  link,
  msgTitle,
  msgAddBtn,
  currentValue,
  maxValue,
  isDisabledAddBtn,
}: PageMainHeaderProps): JSX.Element => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {link ? (
            <Link className={classes.headerTitleLink} to={link}>
              <ChevronLeftIcon className={classes.chevron} />
              <Typography
                className={classes.title}
                component='span'
                variant='subtitle1'
                display='block'
                noWrap
              >
                {msgTitle}
              </Typography>
            </Link>
          ) : (
            <Typography
              className={classes.title}
              component='span'
              variant='subtitle1'
              display='block'
              noWrap
            >
              {msgTitle}
            </Typography>
          )}
        </div>

        {currentValue === 0 || (currentValue && maxValue) ? (
          <Typography
            className={classes.headerCounter}
            variant='button'
            display='block'
          >
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
              disabled={isDisabledAddBtn}
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
  link: undefined,
  currentValue: undefined,
  maxValue: undefined,
  onAdd: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  msgAddBtn: '',
  isDisabledAddBtn: undefined,
};

export default memo(PageMainHeader);
