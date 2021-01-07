import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

const tabCardSetsStyles = (): StyleRules =>
  createStyles({
    body: {
      flexGrow: 1,
    },
    inputCreateNewCardSet: {
      margin: 0,
    },
  });

const tabCardSetsSharedStyles = (): StyleRules =>
  createStyles({
    followingCell: {
      width: '100%',
      textAlign: 'right',
    },
  });

export { tabCardSetsStyles, tabCardSetsSharedStyles };
