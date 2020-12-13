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
      margin: 0,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white,
    },
    menuWrapperIsLoading: {
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    },
    menuWrapper: {
      minWidth: '250px',
      height: '100%',
    },
    userListItem: {
      textAlign: 'center',
      padding: `${theme.spacing(1)}px 0`,
    },
  });
