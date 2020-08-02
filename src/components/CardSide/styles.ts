import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    cardBody: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardInformation: {
      marginBottom: theme.spacing(0.5),
      wordBreak: 'break-all',
    },
    cardDescription: {
      wordBreak: 'break-all',
    },
  });
