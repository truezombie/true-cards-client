import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

const tableStyles = (theme: Theme): StyleRules =>
  createStyles({
    tableWrapper: {
      marginTop: theme.spacing(1),
      '& table': {
        tableLayout: 'fixed',
        '& th, td': {
          height: '52px',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: theme.spacing(2),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        '& th:first-child, td:first-child': {
          paddingLeft: theme.spacing(2),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        '& tr:last-child td': {
          border: 'none',
        },
        '& a': {
          color: theme.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  });

const tableSearchInputStyles = (theme: Theme): StyleRules =>
  createStyles({
    searchWrapper: {
      height: '52px',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    btnClear: {
      marginLeft: theme.spacing(2),
    },
    searchInput: {
      flexGrow: 1,
      paddingRight: theme.spacing(2),
    },
  });

const tablePaginationStyles = (theme: Theme): StyleRules =>
  createStyles({
    button: {
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: 0,
      },
    },
    toolbar: {
      padding: `0 ${theme.spacing(2)}px`,
    },
    selectRoot: {
      margin: `0 ${theme.spacing(2)}px 0 0`,
    },
    caption: {
      marginRight: theme.spacing(2),
    },
  });

export { tableStyles, tableSearchInputStyles, tablePaginationStyles };
