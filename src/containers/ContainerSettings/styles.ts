import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    formContainer: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },
    listITem: {
      '&$selected': {
        borderRadius: theme.shape.borderRadius,
      },
      '&$selected:hover': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:hover': {
        borderRadius: theme.shape.borderRadius,
      },
    },
    listItemSelected: {
      borderRadius: theme.shape.borderRadius,
    },
  });
