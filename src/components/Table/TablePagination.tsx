import React from 'react';

import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { WithStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

import CONFIG from '../../utils/config';
import { tablePaginationStyles, tableSearchInputStyles } from './styles';

interface PaginationProps extends WithStyles<typeof tableSearchInputStyles> {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Pagination = ({
  page,
  count,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  classes,
}: PaginationProps) => {
  function TablePaginationActions() {
    const theme = useTheme();

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='first page'
          className={classes.paginationButton}
        >
          {theme.direction === 'rtl' ? (
            <LastPageIcon fontSize='small' />
          ) : (
            <FirstPageIcon fontSize='small' />
          )}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label='previous page'
          className={classes.paginationButton}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight fontSize='small' />
          ) : (
            <KeyboardArrowLeft fontSize='small' />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='next page'
          className={classes.paginationButton}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft fontSize='small' />
          ) : (
            <KeyboardArrowRight fontSize='small' />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='last page'
          className={classes.paginationButton}
        >
          {theme.direction === 'rtl' ? (
            <FirstPageIcon fontSize='small' />
          ) : (
            <LastPageIcon fontSize='small' />
          )}
        </IconButton>
      </>
    );
  }

  return (
    <TablePagination
      rowsPerPageOptions={CONFIG.paginationRowsPerPage}
      colSpan={3}
      classes={{
        toolbar: classes.toolbar,
        selectRoot: classes.selectRoot,
        caption: classes.caption,
      }}
      component='div'
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};

export default withStyles(tablePaginationStyles)(Pagination);
