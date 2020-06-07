import React, { FC } from 'react';
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

const Table: FC<TableProps> = ({ columns, data }: TableProps) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    getTableBodyProps,
  } = useTable({
    columns,
    data,
  });

  return (
    <Paper>
      <MUITable {...getTableProps()} size='small'>
        <MUITableHead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <MUITableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <MUITableCell
                  style={{ width: `${column.width}px` }}
                  {...column.getHeaderProps()}
                >
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
                      style={{ width: `${cell.column.width}px` }}
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
  );
};

export default Table;
