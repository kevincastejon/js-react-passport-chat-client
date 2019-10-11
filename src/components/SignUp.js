import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import SignUpUI from './SignUpUI';
import Utils from '../Utils';

const signupErrors = [
  'GraphQL error: A unique constraint would be violated on User. Details: Field name = email',
];

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!, $color: String!) {
    signup(email: $email, password: $password, name: $name, color: $color) {
      token
    }
  }
`;

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      color: Utils.colors[parseInt(Math.random() * Utils.colors.length, 10)],
      rememberMe: false,
      errorMessage: '',
      authenticated: false,
    };
  }

  render() {
    const {
      name, email, password, color, rememberMe, errorMessage, authenticated,
    } = this.state;
    if (authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Mutation
          mutation={SIGNUP_MUTATION}
          variables={{
            email, password, name, color,
          }}
          onError={(error) => {
            console.log(error);
            this.setState({ errorMessage: signupErrors.includes(error.message) ? 'Email already used' : 'Unknown error' });
          }}
          onCompleted={(data) => {
            Utils.setCookie('token', data.signup.token, rememberMe ? 365 : 1);
            this.setState({ authenticated: true });
          }}
        >
          {(mutation) => (
            <SignUpUI
              color={color}
              errorMessage={errorMessage}
              onSubmit={mutation}
              onRememberMeChange={(value) => this.setState({ rememberMe: value })}
              onNameChange={(value) => this.setState({ name: value })}
              onMailChange={(value) => this.setState({ email: value })}
              onColorChange={(value) => this.setState({ color: value })}
              onPasswordChange={(value) => this.setState({ password: value })}
            />
          )}
        </Mutation>
      </div>
    );
  }
}
