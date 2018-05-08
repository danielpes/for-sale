import React from 'react';

import '../styles/Header.css';

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
        <a className="navbar-item has-icon-left">
          <span className="icon is-medium">
            <span className="fa-stack has-text-primary">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
          </span>
          <span className="navbar-item is-size-6">Marie & Daniel | Items For Sale</span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">{ addProductButton }</div>
          <div className="navbar-item">{ loginButton }</div>
        </div>
      </div>

    </div>
  );
};

export default Header;