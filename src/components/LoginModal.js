import React from 'react';

//import '../styles/LoginModal.css';

const LoginModal = ({ onLoginSubmit, onLoginCancel }) => {

  function onFormSubmit(ev) {
    ev.preventDefault();
    const email = ev.target.elements.email.value;
    const password = ev.target.elements.password.value;
    onLoginSubmit(email, password);
  }

  return (
    <div className={ 'LoginModal modal is-active' }>

      <div className="modal-background"></div>
      <form className="modal-card" onSubmit={ onFormSubmit }>

        <header className="modal-card-head">
          <p className="modal-card-title">Login</p>
          <button className="delete" type="button" aria-label="close" onClick={ onLoginCancel }></button>
        </header>

        <section className="modal-card-body">

          <div className="field">
            <p className="control has-icons-left">
              <input className="input" name="email" type="email" placeholder="Email"/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left">
              <input className="input" name="password" type="password" placeholder="Password"/>
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

        </section>

        <footer className="modal-card-foot">

          <div className="field is-grouped">
            <p className="control">
              <button className="button is-primary" type="submit">
                Login
              </button>
            </p>
            <p className="control">
              <button className="button is-light" type="button" onClick={ onLoginCancel }>
                Cancel
              </button>
            </p>
          </div>

        </footer>
        
      </form>
    </div>
  )
};

export default LoginModal;
