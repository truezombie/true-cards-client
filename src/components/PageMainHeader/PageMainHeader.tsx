import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { LoaderLinear } from '../Loader';

import styles from './styles';

interface PageMainHeaderProps extends WithStyles<typeof styles> {
  onAdd: () => void;
  isLoading: boolean;
  msgAddBtn: JSX.Element | string;
  msgTitle: JSX.Element | string;
  link?: string;
  currentValue?: number;
  maxValue?: number;
}

const PageMainHeader = ({
  classes,
  isLoading,
  onAdd,
  link,
  msgTitle,
  msgAddBtn,
  currentValue,
  maxValue,
}: PageMainHeaderProps) => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {link ? (
            <Link className={classes.headerTitleLink} to={link}>
              <ChevronLeftIcon className={classes.chevron} />
              <Typography variant='h5' display='block'>
                {msgTitle}
              </Typography>
            </Link>
          ) : (
            <Typography variant='h5' display='block'>
              {msgTitle}
            </Typography>
          )}
        </div>

        {currentValue === 0 || (currentValue && maxValue) ? (
          <Typography variant='button' display='block'>
            {`${currentValue} / ${maxValue}`}
          </Typography>
        ) : null}

        <div className={classes.headerBtn}>
          <Button
            onClick={onAdd}
            variant='contained'
            color='secondary'
            startIcon={<AddIcon />}
          >
            {msgAddBtn}
          </Button>
        </div>
      </div>
      <LoaderLinear show={isLoading} />
    </div>
  );
};

export default PageMainHeader;
