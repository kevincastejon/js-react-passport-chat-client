import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  sendButton: {
    marginTop: '19px',
  },
});

export default function StickyFooter(props) {
  const classes = useStyles();
  const { message, onMessageChange, onSend } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              onSend();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <TextField
                  value={message}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="message"
                  label="Send a message"
                  name="message"
                  autoComplete="message"
                  autoFocus
                  onChange={(e) => onMessageChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={1} className={classes.sendButton}>
                <IconButton color="inherit" type="submit">
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Container>
      </footer>
    </div>
  );
}
StickyFooter.propTypes = {
  message: PropTypes.string.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};
