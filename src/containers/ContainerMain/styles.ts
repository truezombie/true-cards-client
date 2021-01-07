import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    tabs: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(2),
    },
  });
