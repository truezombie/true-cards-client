import React, { useMemo, ReactElement, PropsWithChildren } from 'react';
import { useTable, TableOptions } from 'react-table';

import Paper from '@material-ui/core/Paper';
import MUITable from '@material-ui/core/Table';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';
import { WithStyles } from '@material-ui/core/styles';

import styles from '../PageMainHeader/styles';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface TableProps<T extends object = {}>
  extends TableOptions<T>,
    WithStyles<typeof styles> {}

// eslint-disable-next-line @typescript-eslint/ban-types
export function Table<T extends object>({
  columns,
  data,
  classes,
}: PropsWithChildren<TableProps<T>>): ReactElement {
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
    <Paper elevation={0} variant='outlined' className={classes.tableWrapper}>
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
                    <MUITableCell {...cell.getCellProps()}>
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
  );
}

export default Table;
