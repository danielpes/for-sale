import React from 'react';

import '../styles/ProductList.css';
import ProductCard from './ProductCard';

const ProductList = ({ user, products, onEditClick, onDeleteClick }) => {
  console.log(products)

  const cards = products.map((p) => {
    return (
      <ProductCard 
        key={ p.id } 
        data={ {imgUrl: p.imgUrls[0], ...p} }
        user={ user }
        onEditClick={ onEditClick }
        onDeleteClick={ onDeleteClick }
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