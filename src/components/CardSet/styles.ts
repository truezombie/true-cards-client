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
    cardSetLink: {
      textDecoration: 'none',
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
    cardSet: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      marginBottom: theme.spacing(2),
    },
  });
