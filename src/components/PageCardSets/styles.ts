import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (): StyleRules =>
  createStyles({
    body: {
      flexGrow: 1,
    },
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    inputCreateNewCardSet: {
      margin: 0,
    },
  });
