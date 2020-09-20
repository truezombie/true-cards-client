import React, { FC, useMemo } from 'react';
import { useTable, Column } from 'react-table';

import Paper from '@material-ui/core/Paper';
import MUITable from '@material-ui/core/Table';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';
import { WithStyles } from '@material-ui/core/styles';

import styles from '../PageMainHeader/styles';

type Data = object;

interface TableProps extends WithStyles<typeof styles> {
  columns: Column<Data>[];
  data: Data[];
}

const Table: FC<TableProps> = ({ columns, data, classes }: TableProps) => {
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
  } = useTable({
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
};

export default Table;
