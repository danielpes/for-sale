import React from 'react';

const Header = (props) => {

  const { onLoginClick, onLogoutClick, onAddClick, user } = props

  const addProductButton = user && 
    <a className="button is-primary" onClick={ onAddClick }>Add Item</a>

  const loginButton = user ? 
    <a className="navbar-item" onClick={ onLogoutClick }>Logout</a>
    : <a className="navbar-item" onClick={ onLoginClick }>Login</a>

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">

      <div className="navbar-brand">
        <div className="navbar-item is-size-5">For Sale</div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">{ addProductButton }</div>
        <div className="navbar-item">{ loginButton }</div>

      </div>

    </div>
  );
};

export default Header;