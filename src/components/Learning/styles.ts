import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    progress: {
      marginBottom: theme.spacing(1.5),
    },
    card: {
      display: 'flex',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backfaceVisibility: 'hidden',
      transition: '.8s',
    },
    cardBody: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardsWrapper: {
      position: 'relative',
      height: '320px',
      perspective: '1500px',
    },
    cardBackSide: {
      transform: 'rotateY(180deg)',
    },
    rotateCardFrontSide: {
      transform: 'rotateY(180deg)',
    },
    rotateCardBackSide: {
      transform: 'rotateY(360deg)',
    },
    buttonsGrid: {
      marginTop: theme.spacing(1.5),
    },
    cardInformation: {
      marginBottom: theme.spacing(0.5),
      wordBreak: 'break-all',
    },
    cardDescription: {
      wordBreak: 'break-all',
    },
  });
