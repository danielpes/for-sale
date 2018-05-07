import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import api from "./api/api";
import auth from "./api/auth";
import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginModalActive: false,
      authenticatedUser: undefined
    }
  }

  componentDidMount() {
    api.init();
    auth.onAuthChange(this.handleUserAuthenticated);
  }

  handleUserAuthenticated = (user) => {
    console.log(user);
    this.setState({ authenticatedUser: user });
  }

  handleLoginClick = () => {
    this.setState({ isLoginModalActive: true });
  }

  handleLogoutClick = () => {
    auth.doLogout().then(() => this.setState({ authenticatedUser: undefined }));
  }

  handleLoginSubmit = (email, password) => {
    auth.doLogin(email, password).then(() => this.setState({ isLoginModalActive: false }), auth.handleError);
  }

  handleLoginCancel = () => {
    this.setState({ isLoginModalActive: false });
  }

  render() {
    return (
      <div>
        <LoginModal 
          isActive={ this.state.isLoginModalActive }
          onLoginSubmit={ this.handleLoginSubmit }
          onLoginCancel={ this.handleLoginCancel }
        />
        <Header 
          onLoginClick={ this.handleLoginClick }
          onLogoutClick={ this.handleLogoutClick }
          user={ this.state.authenticatedUser }
        />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
