import React, { Component } from 'react';
import LoginModal from './components/LoginModal';
import NewProductModal from './components/NewProductModal';
import ReservationModal from './components/ReservationModal';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import api from "./api/api";
import auth from "./api/auth";
import utils from "./utils/utils";
import productsModel from "./api/productsModel";

//import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null,
      editingId: null,
      isLoginModalActive: false,
      isNewProductModalActive: false,
      reservationModalProduct: null,
      authenticatedUser: null,
      lastPerson: {
        name: null,
        email: null,
        phone: null
      }
    }

    this.handleCloseModal = this.handleCloseModal.bind(this)
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
  
  handleAddClick = () => {
    this.setState({ isNewProductModalActive: true });
  }

  handleDeleteClick = (id) => {
    if(window.confirm("Are you sure?")) productsModel.delete(id);
  }

  handleReservationClick = (id) => {
    this.setState({ reservationModalProduct: this.state.products.find(p => p.id === id) })
  }
  
  handleCloseModal(whichModal) {
    let stateVar, stateObj = {};
    if (whichModal === "login") stateVar = "isLoginModalActive"
    else if (whichModal === "newProduct") stateVar = "isNewProductModalActive"
    else if (whichModal === "reservation") stateVar = "reservationModalProduct"
    stateObj[stateVar] = null
    return () => this.setState(stateObj);
  }

  handleReservationSubmit = (product, person) => {
    productsModel.addPersonToWaitList(product, person).then(() => window.alert("Reservé"))
    this.setState({ lastPerson: person, reservationModalProduct: null })
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
            onLoginCancel={ this.handleCloseModal("login") }
          />
        ) }
        { this.state.isNewProductModalActive && (
          <NewProductModal 
            onAddProductSubmit={ this.handleAddProductSubmit }
            onAddProductCancel={ this.handleCloseModal("newProduct") }
          />
        ) }
        { this.state.reservationModalProduct && (
          <ReservationModal 
            onReservationSubmit={ this.handleReservationSubmit }
            onReservationCancel={ this.handleCloseModal("reservation") }
            product={ this.state.reservationModalProduct }
            lastPerson={ this.state.lastPerson }
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
          onReservationClick={ this.handleReservationClick }
        />
        <Footer />
      </div>
    );
  }
}

export default App;
