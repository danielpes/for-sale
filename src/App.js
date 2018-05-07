import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import api from "./api/api";
import auth from "./api/auth";
import products from "./api/products";
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

  handleAddClick = () => {
    products.add({
      name: "test2",
      description: "",
      price: 41.52,
      picUrls: ["url3", "url4"],
      dispDate: new Date().toISOString()
    })
  }

  handleLogoutClick = () => {
    auth.doLogout().then(() => this.setState({ authenticatedUser: undefined }), auth.handleError);
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
        { this.state.isLoginModalActive && (
          <LoginModal 
            onLoginSubmit={ this.handleLoginSubmit }
            onLoginCancel={ this.handleLoginCancel }
          />
        ) }
        <Header 
          onLoginClick={ this.handleLoginClick }
          onLogoutClick={ this.handleLogoutClick }
          onAddClick={ this.handleAddClick }
          user={ this.state.authenticatedUser }
        />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
