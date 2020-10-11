import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    container: {
      display: 'flex',
      padding: 0,
      flexGrow: 1,
      flexDirection: 'column',
    },
    formContainer: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },
    loaderWrapper: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      margin: `${theme.spacing(2)}px 0`,
    },
  });
