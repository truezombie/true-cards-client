import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles/withStyles';

export default (theme: Theme): StyleRules =>
  createStyles({
    title: {
      textTransform: 'uppercase',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    chevron: {
      color: theme.palette.primary.main,
    },
    divider: {
      margin: `${theme.spacing(3)}px 0`,
    },
    descriptionModes: {
      marginBottom: `${theme.spacing(3)}px`,
    },
    values: {
      marginBottom: theme.spacing(1.5),
    },
    gridColumn: {
      textAlign: 'center',
    },
    titleAmountOfCards: {
      marginTop: theme.spacing(1.5),
    },
    cardTitle: {
      marginBottom: theme.spacing(3),
    },
    input: {
      marginBottom: theme.spacing(3),
    },
    typeOfStudyTitle: {
      marginTop: theme.spacing(3),
    },
  });
