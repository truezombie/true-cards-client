import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (): StyleRules =>
  createStyles({
    loaderWrapper: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  });
