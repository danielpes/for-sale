import React from 'react';

import '../styles/Body.css';
import ProductList from './ProductList';

const Body = ({ user, products, onEditClick, onDeleteClick }) => {

  return (
    <div className="Body">
      <section className="section">
        <ProductList 
          user={ user }
          products={ products }
          onEditClick={ onEditClick }
          onDeleteClick={ onDeleteClick }
        />
      </section>
    </div>
  )
}

export default Body;