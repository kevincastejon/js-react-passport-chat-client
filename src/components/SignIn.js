import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import SignInUI from './SignInUI';
import Utils from '../Utils';

const authErrors = [
  'GraphQL error: Invalid email or password',
];

const SIGNIN_MUTATION = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
      authenticated: false,
    };
  }

  render() {
    const {
      email, password, rememberMe, errorMessage, authenticated,
    } = this.state;
    if (authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Mutation
          mutation={SIGNIN_MUTATION}
          variables={{ email, password }}
          onError={(error) => {
            this.setState({ errorMessage: authErrors.includes(error.message) ? 'Wrong mail or password' : 'Unknown error' });
          }}
          onCompleted={(data) => {
            Utils.setCookie('token', data.login.token, rememberMe ? 365 : 1);
            this.setState({ authenticated: true });
          }}
        >
          {(mutation) => (
            <SignInUI
              errorMessage={errorMessage}
              onSubmit={mutation}
              onRememberMeChange={(value) => this.setState({ rememberMe: value })}
              onMailChange={(value) => this.setState({ email: value })}
              onPasswordChange={(value) => this.setState({ password: value })}
            />
          )}
        </Mutation>
      </div>
    );
  }
}
