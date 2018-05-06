import React from 'react';

const Header = (props) => {

  const { onLoginClick } = props

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">

      <div className="navbar-brand">
      </div>

      {/* Sign In */}
      <div className="navbar-end">
        <a className="navbar-item" onClick={ onLoginClick }>Sign In</a>
      </div>

    </div>
  );
};

export default Header;