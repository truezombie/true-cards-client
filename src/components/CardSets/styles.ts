import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    headerTitle: {
      flexGrow: 1,
    },
    headerBtn: {
      flexShrink: 0,
    },
    // -----------------
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      marginTop: theme.spacing(1),
      flexGrow: 1,
    },
    paginationWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    inputCreateNewCardSet: {
      margin: 0,
    },
  });
