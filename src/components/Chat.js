import React from 'react';
import gql from 'graphql-tag';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiGithubCircle } from '@mdi/js';
import MessageList from './MessageList';
import Utils from '../Utils';

const authErrors = [
  'GraphQL error: Not authenticated',
];

const POST_MUTATION = gql`
  mutation SendMutation($content: String!) {
    post(content: $content) {
      id
    }
  }
`;

const styles = (theme) => ({
  root: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    // minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  sendButton: {
    marginTop: '19px',
  },
  container: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  render() {
    const { classes } = this.props;
    const { message } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <a rel="noopener noreferrer" target="_BLANK" href="https://github.com/kevincastejon">
                <Icon
                  path={mdiGithubCircle}
                  title="User Profile"
                  size={2}
                  color="white"
                />
              </a>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
      OpenChat
            </Typography>
            <a href="#/signin" className={classes.button} variant="body">
              <Button className={classes.button} onClick={() => { Utils.deleteCookie('token'); }}>
                {'Logout'}
              </Button>
            </a>
          </Toolbar>
        </AppBar>
        <MessageList />
        <CssBaseline />
        <footer className={classes.footer}>
          <Mutation
            mutation={POST_MUTATION}
            variables={{ content: message.trimEnd() }}
            onError={(error) => {
              if (authErrors.includes(error.message)) {
                return <Redirect to="/signin" />;
              }
              return <div>Error</div>;
            }}
          >
            {(mutation) => (
              <Container className={classes.container}>
                <form
                  className={classes.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutation();
                    this.setState({ message: '' });
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
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
                        onChange={(e) => this.setState({ message: e.target.value.trimStart() })}
                      />
                    </Grid>
                    <Grid item xs={1} className={classes.sendButton}>
                      <IconButton disabled={message.trimEnd().length === 0} color="inherit" type="submit">
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            )}
          </Mutation>
        </footer>
      </div>
    );
  }
}
Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Chat);
