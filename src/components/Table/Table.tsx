import React, { useMemo, ReactElement, PropsWithChildren, memo } from 'react';
import { useTable, TableOptions } from 'react-table';

import Paper from '@material-ui/core/Paper';
import MUITable from '@material-ui/core/Table';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';
import { WithStyles } from '@material-ui/core/styles';

import TableSearchInput from './TableSearchInput';
import TablePagination from './TablePagination';

import styles from '../PageMainHeader/styles';
import { LoaderLinear, Loader } from '../Loader';
import FullBlockMessage from '../FullBlockMessage';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface TableProps<T extends object = {}>
  extends TableOptions<T>,
    WithStyles<typeof styles> {
  onSearch: (search: string) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  paginationItemsCount: number;
  page: number;
  rowsPerPage: number;
  isLoading: boolean;
  msgNoData: string;
  searchValue: string;
}

const Table = memo(
  // eslint-disable-next-line @typescript-eslint/ban-types
  <T extends object>({
    columns,
    data,
    classes,
    page,
    rowsPerPage,
    onSearch,
    paginationItemsCount,
    onRowsPerPageChange,
    onPageChange,
    isLoading,
    searchValue,
    msgNoData,
  }: PropsWithChildren<TableProps<T>>): ReactElement => {
    const defaultColumn = React.useMemo(
      () => ({
        width: 0,
      }),
      []
    );

    const {
      getTableProps,
      headerGroups,
      flatHeaders,
      rows,
      prepareRow,
      getTableBodyProps,
    } = useTable<T>({
      defaultColumn,
      columns,
      data,
    });

    const colGroups = useMemo(() => {
      return (
        <colgroup>
          {flatHeaders.map((head) => {
            return (
              <col
                key={head.id}
                style={{ width: head.width ? `${head.width}px` : undefined }}
              />
            );
          })}
        </colgroup>
      );
    }, [flatHeaders]);

    return (
      <>
        <TableSearchInput onSearch={onSearch} searchValue={searchValue} />
        <LoaderLinear show={isLoading && data.length !== 0} />
        {isLoading && !data.length ? <Loader /> : null}
        {!isLoading && !data.length ? (
          <FullBlockMessage message={msgNoData} />
        ) : null}
        {data.length ? (
          <>
            <Paper
              elevation={0}
              variant='outlined'
              className={classes.tableWrapper}
            >
              <MUITable {...getTableProps()}>
                {colGroups}
                <MUITableHead>
                  {headerGroups.map((headerGroup) => (
                    // eslint-disable-next-line react/jsx-key
                    <MUITableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // eslint-disable-next-line react/jsx-key
                        <MUITableCell {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </MUITableCell>
                      ))}
                    </MUITableRow>
                  ))}
                </MUITableHead>
                <MUITableBody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <MUITableRow hover {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <MUITableCell
                              valign='middle'
                              {...cell.getCellProps()}
                            >
                              {cell.value ? cell.render('Cell') : '-'}
                            </MUITableCell>
                          );
                        })}
                      </MUITableRow>
                    );
                  })}
                </MUITableBody>
              </MUITable>
            </Paper>
            <TablePagination
              count={paginationItemsCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={(event, newPage) => onPageChange(newPage)}
              onChangeRowsPerPage={(event) =>
                onRowsPerPageChange(parseInt(event.target.value, 10))
              }
            />
          </>
        ) : null}
      </>
    );
  }
);

export default Table;
