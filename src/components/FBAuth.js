import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Utils from '../Utils';

export default function FBAuth(props) {
  const { match } = props;
  const { token } = match.params;
  Utils.setCookie('token', token, 365);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
}
FBAuth.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};
