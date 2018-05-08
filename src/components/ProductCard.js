import React from 'react';

import utils from  '../utils/utils'
import '../styles/ProductCard.css';

const ProductCard = ({ data, user, onEditClick, onDeleteClick }) => {

  const { id, name, description, price, imgUrl, dispDate } = data;

  const priceText = (price && price > 0) 
    ? <p className="subtitle is-size-6"><b>{ utils.formatPrice(price) }</b></p>
    : <p className="subtitle is-size-6 has-text-success"><b>GRATUIT !</b></p>

  let footer;
  if (user) footer = (
    <footer className="card-footer">
      { /*<a class="card-footer-item" onClick={ () => onEditClick(id) }>Edit</a>*/ }
      <a className="card-footer-item has-text-danger" onClick={ () => onDeleteClick(id) }>Delete</a> 
    </footer>
  )

  const dispDateText = (dispDate <= new Date())
    ? <span><b className="has-text-success">Disponibilité : Immediat !</b></span>
    : <span><b>Disponibilité : </b> { dispDate.toLocaleDateString() }</span>
  
  console.log(data)

  return (
    <div className="ProductCard card">

      <div className="card-image">
        <figure className="image is-1by1">
          <img src={ imgUrl }/>
        </figure>
      </div>

      <div className="card-content">

        <div className="content">
          <p className="title is-size-5">{ name }</p>
          { priceText }
        </div>

        <div className="content">
          <p className="is-size-7">
            { description }
            <br/><br/>
            { dispDateText }
          </p>
        </div>
      </div>

      { user && footer }
      
    </div>
  );
}

export default ProductCard