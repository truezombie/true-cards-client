import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: theme.spacing(3),
    },
  });
