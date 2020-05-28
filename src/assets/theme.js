import { createMuiTheme } from '@material-ui/core/styles';
import './css/catamaran.css';

const catamaran = {
  fontFamily: 'Catamaran',
  fontStyle: 'normal',
  src: `
      local('Catamaran'),
      local('Catamaran-Regular'),
    `,
};

const institutionalTheme = createMuiTheme({
  MuiCssBaseline: {
    '@global': {
      '@font-face': [catamaran],
    },
  },
  palette: {
    primary: {
      main: '#007a33',
    },
    secondary: {
      main: '#00b2a9',
    },
  },
  typography: {
    fontFamily: 'Catamaran',
    button: {
      textTransform: 'none',
    },
    h1: {
      fontFamily: 'Catamaran',
      fontSize: '36px',
      lineHeight: '48px',
    },
    h2: {
      fontFamily: 'Catamaran',
      fontSize: '30px',
      lineHeight: '36px',
    },
    h3: {
      fontFamily: 'Catamaran',
      fontSize: '24px',
      lineHeight: '32px',
    },
    h4: {
      fontFamily: 'Catamaran',
      fontSize: '18px',
      lineHeight: '24px',
    },
    h5: {
      fontFamily: 'Catamaran',
      fontSize: '14px',
      lineHeight: '16px',
    },
    h6: {
      fontFamily: 'Catamaran',
      fontSize: '12px',
      lineHeight: '16px',
    },
    p: {
      fontFamily: 'Catamaran-Regular',
      fontSize: '12px',
      lineHeight: '17.4px',
    },
    body1: {
      fontFamily: 'Catamaran-Regular',
      fontSize: '12px',
      lineHeight: '17.4px',
    },
    body2: {
      fontFamily: 'Catamaran-Regular',
      fontSize: '12px',
      lineHeight: '17.4px',
    },
  },
});

export default institutionalTheme;
