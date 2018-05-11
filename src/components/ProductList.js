import React from 'react';

import '../styles/ProductList.css';
import ProductCard from './ProductCard';

const ProductList = ({ user, products, onEditClick, onDeleteClick, onReservationClick }) => {

  const cards = products.map((p) => {
    return (
      <ProductCard 
        key={ p.id } 
        data={ p }
        user={ user }
        onEditClick={ onEditClick }
        onDeleteClick={ onDeleteClick }
        onReservationClick={ onReservationClick }
      />
    )
  });

  return (
    <div className="ProductList">
      { cards }
    </div>
  )
}

export default ProductList;