import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    appBar: {
      marginBottom: theme.spacing(3),
    },
    title: {
      display: 'block',
      flexGrow: 1,
      textAlign: 'center',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white,
    },
  });
