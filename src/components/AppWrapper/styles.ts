import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (): StyleRules =>
  createStyles({
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  });
