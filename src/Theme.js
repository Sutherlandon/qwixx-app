import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, grey, red, yellow } from '@material-ui/core/colors';

export default createMuiTheme({
  spacing: (factor = 1) => `${0.25 * factor}em`,
  palette: {
    grey: {
      light: grey[200],
      main: grey[500],
      dark: grey[700],
      darker: grey[900],
    }, 
    blue: {
      light: blue[100],
      main: blue[700],
    },
    green: {
      light: green[100],
      main: green[700],
    },
    red: {
      light: red[100],
      main: red[700],
    },
    yellow: {
      light: yellow[100],
      main: yellow[700],
    }
  }
});