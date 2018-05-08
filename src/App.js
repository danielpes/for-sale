import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import NewProductModal from './components/NewProductModal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import api from "./api/api";
import auth from "./api/auth";
import utils from "./utils/utils";
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
    auth.onAuthChange(this.handleUserChange);
    productsModel.onChange(prods => this.setState({ products: prods }));
  }

  handleUserChange = (user) => {
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
  
  handleAddProductCancel = () => {
    this.setState({ isNewProductModalActive: false });
  }

  handleAddProductSubmit = (data, imageFiles) => {
    const firstImage = imageFiles[0];
    // Scale image to get a 800px thumbnail
    utils.scaleImage(firstImage, 800, firstImage.type).then(
      // Upload images
      (thumbBlob) => {
        thumbBlob.name = "thumb_" + firstImage.name;
        return Promise.all(productsModel.uploadImages([thumbBlob, ...imageFiles]));
      }
    ).then(
      // Create product in the database
      (imgUrls) => {
        const [thumbnail, ...others] = imgUrls;
        return productsModel.create({ ...data, thumbnail, imgUrls: others });
      }
    ).then(
      // Close modal
      () => this.setState({ isNewProductModalActive: false })
    );
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
