import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    withBackSizeCheckbox: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  });
