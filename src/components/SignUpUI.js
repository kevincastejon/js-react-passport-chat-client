import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CirclePicker } from 'react-color';
import Container from '@material-ui/core/Container';
import UILink from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import Utils from '../Utils';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Made by '}
      <UILink color="inherit" href="https://material-ui.com/">
        Kevin Castejon
      </UILink>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInUI(props) {
  const {
    color,
    errorMessage,
    onNameChange,
    onMailChange,
    onColorChange,
    onRememberMeChange,
    onPasswordChange,
    onSubmit,
  } = props;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography component="h5" variant="h5" color="error">
          {errorMessage}
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <TextField
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="Name"
            autoFocus
            onChange={(e) => onNameChange(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => onMailChange(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="colorPicker">
Avatar color
            <CirclePicker
              color={color}
              id="colorPicker"
              width="190px"
              colors={Utils.colors}
              onChange={(newColor) => onColorChange(newColor.hex)}
            />
          </label>
          <br />
          <FormControlLabel
            control={<Checkbox value="rememberMe" color="primary" />}
            label="Remember me"
            onChange={(e) => onRememberMeChange(e.target.checked)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <UILink href="#/signin" variant="body2">
                {'Already have an account? Sign in'}
              </UILink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
SignInUI.propTypes = {
  color: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onRememberMeChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onMailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
