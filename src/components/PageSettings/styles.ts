import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    tabContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    formContainer: {
      display: 'flex',
      marginTop: theme.spacing(1),
    },
  });
