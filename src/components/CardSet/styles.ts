import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    cardTitleWrap: {
      display: 'flex',
      verticalAlign: 'middle',
      flexGrow: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    cardButtonsWrap: {
      flexShrink: 0,
      '& > button': {
        marginLeft: theme.spacing(1),
      },
    },
    indicatorWrappers: {
      display: 'flex',
      justifyContent: 'center',
    },
    indicator: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      cursor: 'default',
    },
    cardSetLink: {
      textDecoration: 'none',
      display: 'block',
      width: '100%',
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
    cardSetTitle: {
      margin: 0,
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cardSetIco: {
      marginRight: theme.spacing(2),
    },
    cardSetWrap: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    cardSetDivider: {
      margin: `${theme.spacing(1.5)}px 0`,
    },
    cardSet: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
