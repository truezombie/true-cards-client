import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    container: {
      marginBottom: theme.spacing(8),
    },
    paperWrapper: {
      margin: theme.spacing(3, 0, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
  });
