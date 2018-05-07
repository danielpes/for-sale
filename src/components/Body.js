import React from 'react';

import '../styles/Body.css';
import ProductList from './ProductList';

const Body = ({ products }) => {

  return (
    <div className="Body">
      <section className="section">
        <ProductList products={ products }/>
      </section>
    </div>
  )
}

export default Body;