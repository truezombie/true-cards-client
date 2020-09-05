import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (): StyleRules =>
  createStyles({
    cell: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: '100px',
      textOverflow: 'ellipsis',
    },
    bodyRow: {
      '&:last-child td': {
        border: 'none',
      },
    },
  });
