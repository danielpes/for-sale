import React from 'react';

import '../styles/ProductList.css';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  console.log(products)

  const cards = products.map(p => <ProductCard key={ p.id } data={ {imgUrl: p.imgUrls[0], ...p} }/>)

  return (
    <div className="ProductList">
      { cards }
    </div>
  )
}

export default ProductList;