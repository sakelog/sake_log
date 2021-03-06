import {
  createStyles,
  Theme,
  makeStyles,
  fade,
} from '@material-ui/core/styles';

export const contactFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.4rem',
    },
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.primary.main,
      color: '#ffffff',
      borderRadius: '100%',
      width: '2.4rem',
      height: '2.4rem',
      padding: '0.4rem',
      margin: theme.spacing(1),
    },
    input: {
      width: '100%',
      background: fade(theme.palette.primary.main, 0.15),
      padding: theme.spacing(1),
      fontSize: '1.6rem',
    },
    textarea: {
      width: '100%',
      resize: 'vertical',
      borderRadius: theme.shape.borderRadius,
      background: fade(theme.palette.primary.main, 0.15),
      padding: theme.spacing(1),
      fontSize: '1.6rem',
    },
    privacy: {
      fontSize: '1.4rem',
    },
    button: {
      margin: '2rem auto',
      display: 'block',
    },
  })
);
