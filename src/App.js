import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { firebaseInit, doLogin } from "./api/firebase";
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
    firebaseInit()
  }

  handleLoginClick = () => {
    this.setState({ isLoginModalActive: true })
  }

  handleLoginSubmit = (email, password) => {
    doLogin(email, password)
      .then(() => this.setState({ isLoginModalActive: false }))
      .catch(alert)
  }

  handleLoginCancel = () => {
    this.setState({ isLoginModalActive: false })
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
        />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
