import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    card: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderColor: theme.palette.primary.light,
      backgroundColor: 'transparent',
    },
    caption: {
      marginTop: theme.spacing(1),
    },
  });
