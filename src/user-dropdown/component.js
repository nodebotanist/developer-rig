import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.sass';

export class UserDropdown extends Component {
  render() {
    const { login, profile_image_url } = this.props.login;
    return (
      <div className='user-dropdown'>
        <img alt='profile' className='user-dropdown__image' src={profile_image_url} />
        <div className='user-dropdown__username'>{login}</div>
      </div>
    );
  }
}

UserDropdown.propTypes = {
  login: PropTypes.object,
};
