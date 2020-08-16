import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (): StyleRules =>
  createStyles({
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  });
