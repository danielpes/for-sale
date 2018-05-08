import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import NewProductModal from './components/NewProductModal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import api from "./api/api";
import auth from "./api/auth";
import productsModel from "./api/productsModel";

import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      editingId: null,
      isLoginModalActive: false,
      isNewProductModalActive: false,
      authenticatedUser: null
    }
  }

  componentDidMount() {
    api.init();
    auth.onAuthChange(this.handleUserAuthenticated);
    productsModel.onChange(prods => this.setState({ products: prods }));
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
    this.setState({ isNewProductModalActive: true });
  }

  handleDeleteClick = (id) => {
    if(window.confirm("Are you sure?")) productsModel.delete(id);
  }

  handleAddProductSubmit = (data, imageFile) => {
    Promise.all(productsModel.uploadImages(imageFile))
      .then(imgUrls => productsModel.create({ ...data, imgUrls }))
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
        <Body 
          user={ this.state.authenticatedUser }
          products={ this.state.products }
          onEditClick={ () => console.log("edit") }
          onDeleteClick={ this.handleDeleteClick }
        />
        <Footer />
      </div>
    );
  }
}

export default App;
