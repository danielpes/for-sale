import React from 'react';

import '../styles/Header.css';

const Header = (props) => {

  const { user, onLoginClick, onLogoutClick, onAddClick, onListClick } = props

  const addProductButtonJSX = user && 
    <a className="button is-primary" onClick={ onAddClick }>Add Item</a>

  const loginButtonJSX = user ? 
    <a className="navbar-item" onClick={ onLogoutClick }>Logout</a>
    : <a className="navbar-item" onClick={ onLoginClick }>Login</a>

  const tableButtonJSX = user &&
    <a className="button is-light" onClick={ onListClick }>Products List</a>

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">

      <div className="navbar-brand">
        <a onClick={ () => window.scrollTo(0, 0) } className="navbar-item has-icon-left">
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
          <div className="navbar-item">{ addProductButtonJSX }</div>
          <div className="navbar-item">{ tableButtonJSX }</div>
          <div className="navbar-item">{ loginButtonJSX }</div>
        </div>
      </div>

    </div>
  );
};

export default Header;