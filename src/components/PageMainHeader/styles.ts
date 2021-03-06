import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    headerWrapper: {
      marginBottom: theme.spacing(1),
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    headerTitle: {
      flexGrow: 1,
      overflow: 'hidden',
      textTransform: 'uppercase',
    },
    headerCounter: {
      whiteSpace: 'nowrap',
      paddingLeft: theme.spacing(1),
    },
    chevron: {
      color: theme.palette.primary.main,
    },
    headerTitleLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
    headerBtn: {
      flexShrink: 0,
      marginLeft: theme.spacing(3),
    },
    title: {
      lineHeight: '36px',
      height: '36px',
    },
  });
