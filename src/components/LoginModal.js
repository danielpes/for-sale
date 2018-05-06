import React from 'react';

import '../styles/LoginModal.css';

const LoginModal = ({isActive, onLoginSubmit, onLoginCancel }) => {
  return (
    <div className={ `LoginModal modal${(isActive ? ' is-active' : '')}` }>

      <div className="modal-background"></div>
      <div className="modal-card">

        <header className="modal-card-head">
          <p className="modal-card-title">Login</p>
          <button className="delete" aria-label="close" onClick={ onLoginCancel }></button>
        </header>

        <section className="modal-card-body">

          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="email" placeholder="Email"/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Password"/>
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

        </section>

        <footer className="modal-card-foot">

          <div className="field is-grouped">
            <p className="control">
              <button className="button is-primary" onClick={ onLoginSubmit }>
                Login
              </button>
            </p>
            <p className="control">
              <button className="button is-light" onClick={ onLoginCancel }>
                Cancel
              </button>
            </p>
          </div>

        </footer>
        
      </div>
    </div>
  )
};

export default LoginModal;
