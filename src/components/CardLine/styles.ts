import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    card: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    actions: {
      padding: '0 !important',
      textAlign: 'right',
    },
  });
