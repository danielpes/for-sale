import React from 'react';

import utils from  '../utils/utils'
import Lightbox from 'react-images';
import '../styles/ProductCard.css';

class ProductCard extends React.Component {

  constructor(props) {
    super(props);

    Object.assign(this, props.data);
    this.name = this.capitalizeFirstLetter(this.name)
    this.description = this.capitalizeFirstLetter(this.description.replace(/Dimension/g, "\nDimension"))

    this.onEditClick = props.onEditClick;
    this.onDeleteClick = props.onDeleteClick;

    this.priceJSX = this.makePriceJSX();
    this.footerJSX = this.makeFooterJSX();
    this.dispDateJSX = this.makeDispDateJSX();
    
    this.state = {
      currentImage: 0,
      isImageModalOpen: false,
      isDetailsModalOpen: false
    };

  }

  makePriceJSX() {
    return (this.price && this.price > 0) 
      ? <span className="subtitle is-6"><b>{ utils.formatPrice(this.price) }</b></span>
      : <span className="subtitle is-6 has-text-primary"><b>GRATUIT !</b></span>
  }

  makeFooterJSX() {
    return (
      <footer className="card-footer">
        { /*<a class="card-footer-item" onClick={ () => onEditClick(id) }>Edit</a>*/ }
        <a className="card-footer-item has-text-danger" onClick={ () => this.onDeleteClick(this.id) }>Delete</a> 
      </footer>
    )
  }

  makeDispDateJSX() {
    return (this.dispDate <= new Date())
      ? <span><b className="disp-date is-size-7 has-text-info">Disponibilité : Immédiate !</b></span>
      : <span className="disp-date is-size-7" ><b>Disponibilité : </b> { this.dispDate.toLocaleDateString("fr-FR") }</span>
  }

  capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  handleLightboxClose = () => {
    this.setState({
      currentImage: 0,
      isImageModalOpen: false 
    });
  }

  handleImageClick = () => {
    this.setState({ isImageModalOpen: true });
  }

  gotoPrev = () => {
		this.setState(prevState => ({ 
      currentImage: prevState.currentImage - 1 
    }));
  }
  
	gotoNext = () => {
		this.setState(prevState => ({ 
      currentImage: prevState.currentImage + 1 
    }));
	}
  
  render() {
    return (
      <div className="ProductCard card">

        <Lightbox
          currentImage={ this.state.currentImage }
          images={ this.imgUrls.map(u => ({ src: u })) }
          isOpen={ this.state.isImageModalOpen }
          onClickNext={ this.gotoNext }
          onClickPrev={ this.gotoPrev }
          onClose={ this.handleLightboxClose }
          preventScroll={ false }
        />
              
        <div className="card-image">
          <figure className="image is-1by1">
            <img src={ this.thumbnail || this.imgUrls[0] } alt={ this.name } onClick={ this.handleImageClick }/>
          </figure>
        </div>

        <div className="card-content">

          <div className="content">
            <span className="title is-5">{ this.name }</span>
            { this.priceJSX }
          </div>

          <div style={{whiteSpace: "pre-wrap"}} className="content is-size-7">
            { this.description }
          </div>

          <div className="content">
            { this.dispDateJSX }
          </div>
        </div>

        { this.props.user && this.footerJSX }
        
      </div>
    )
  }
}

export default ProductCard