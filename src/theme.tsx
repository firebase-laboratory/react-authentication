import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import { blue, red, green } from '@material-ui/core/colors';

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: blue[600],
      },
      secondary: {
        main: green[600],
      },
      error: {
        main: red[600],
      },
      background: {
        default: '#ffffff',
      },
    },
  })
);

export const useFormCardStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(8),
  },
  cardContent: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  error: {
    marginBottom: theme.spacing(3),
  },
}));
