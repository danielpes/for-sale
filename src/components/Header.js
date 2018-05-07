import React from 'react';

const Header = (props) => {

  const { onLoginClick, onLogoutClick, user } = props

  console.log(user);

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">

      <div className="navbar-brand">
      </div>

      {/* Sign In */}
      <div className="navbar-end">
        <a className="navbar-item" onClick={ user ? onLogoutClick : onLoginClick }>{ user ? user.email : 'Sign In' }</a>
      </div>

    </div>
  );
};

export default Header;