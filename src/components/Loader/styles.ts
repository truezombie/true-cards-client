import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

const loaderStyles = (): StyleRules =>
  createStyles({
    root: {
      margin: 'auto',
    },
  });

const linearLoaderStyles = (theme: Theme): StyleRules =>
  createStyles({
    progressWrap: {
      width: '100%',
    },
    progressHeight: {
      height: theme.spacing(1),
    },
  });

export { loaderStyles, linearLoaderStyles };
