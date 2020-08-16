import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#10161A',
      white: '#FFFFFF',
    },
    primary: {
      light: '#2B95D6',
      main: '#137CBD',
      dark: '#106BA3',
      contrastText: '#fff',
    },
    success: {
      light: '#15B371',
      main: '#0F9960',
      dark: '#0D8050',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      light: '#F55656',
      main: '#DB3737',
      dark: '#C23030',
      contrastText: '#fff',
    },
    warning: {
      light: '#F29D49',
      main: '#D9822B',
      dark: '#BF7326',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: '#AD99FF',
      main: '#7157D9',
      dark: '#5642A6',
      contrastText: '#fff',
    },
    secondary: {
      light: '#2B95D6',
      main: '#137CBD',
      dark: '#106BA3',
      contrastText: '#fff',
    },
    grey: {
      50: '#F5F8FA',
      100: '#EBF1F5',
      200: '#E1E8ED',
      300: '#D8E1E8',
      400: '#CED9E0',
      500: '#BFCCD6',
      600: '#A7B6C2',
      700: '#8A9BA8',
      800: '#738694',
      900: '#5C7080',
      A100: '#394B59',
      A200: '#30404D',
      A400: '#293742',
      A700: '#202B33',
    },
  },
});

export default theme;
