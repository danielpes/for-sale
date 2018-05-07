import React from 'react';

const Header = (props) => {

  const { onLoginClick, user } = props

  console.log(user);

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">

      <div className="navbar-brand">
      </div>

      {/* Sign In */}
      <div className="navbar-end">
        <a className="navbar-item" onClick={ user || onLoginClick }>{ user ? user.email : 'Sign In' }</a>
      </div>

    </div>
  );
};

export default Header;