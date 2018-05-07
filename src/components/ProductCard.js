import React from 'react';

import utils from  '../utils/utils'
import '../styles/ProductCard.css';

const ProductCard = ({ data }) => {

  const { name, description, price, imgUrl, dispDate } = data;
  
  console.log(data)

  return (
    <div className="ProductCard card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={ imgUrl } alt="Placeholder"/>
        </figure>
      </div>

      <div className="card-content">

        <div className="content">
          <p className="title is-size-5">{ name }</p>
          <p className="subtitle is-size-6">{ price && utils.formatPrice(price) }</p>
        </div>

        <div className="content">
          <p className="is-size-7">
            { description }
            <br/><br/>
            <b>Disponibilité : </b>{ dispDate }
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProductCard