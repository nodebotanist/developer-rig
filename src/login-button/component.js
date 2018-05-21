import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.sass';

export class LoginButton extends Component {
  render() {
    return (
      <div className="login-button">
        <button
          onClick={this.props.loginHandler}>Log In</button>
      </div>
    );
  }
}

LoginButton.propTypes = {
  loginHandler: PropTypes.func.isRequired
};
