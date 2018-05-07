import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import NewProductModal from './components/NewProductModal';
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
      products: [],
      isLoginModalActive: false,
      isNewProductModalActive: false,
      authenticatedUser: undefined
    }
  }

  componentDidMount() {
    api.init();
    auth.onAuthChange(this.handleUserAuthenticated);
    products.onChange(products => this.setState({ products: products }));
  }

  handleUserAuthenticated = (user) => {
    console.log(user);
    this.setState({ authenticatedUser: user });
  }

  handleLoginClick = () => {
    this.setState({ isLoginModalActive: true });
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

  handleAddClick = () => {
    this.setState({ isNewProductModalActive: true })
  }

  handleAddProductSubmit = (data, imageFile) => {
    Promise.all(products.uploadImages(imageFile))
      .then(imgUrls => products.create({ ...data, imgUrls }))
      .then(() => this.setState({ isNewProductModalActive: false }));
  }

  handleAddProductCancel = () => {
    this.setState({ isNewProductModalActive: false });
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
        { this.state.isNewProductModalActive && (
          <NewProductModal 
            onAddProductSubmit={ this.handleAddProductSubmit }
            onAddProductCancel={ this.handleAddProductCancel }
          />
        ) }
        <Header 
          onLoginClick={ this.handleLoginClick }
          onLogoutClick={ this.handleLogoutClick }
          onAddClick={ this.handleAddClick }
          user={ this.state.authenticatedUser }
        />
        <Body products={ this.state.products }/>
        <Footer />
      </div>
    );
  }
}

export default App;
