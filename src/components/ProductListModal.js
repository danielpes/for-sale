import React from 'react';

import ReactTable from 'react-table';

import '../styles/ProductListModal.css';
import 'react-table/react-table.css'

import utils from '../utils/utils'

const ProductListModal = ({ products, onClose }) => {
 
  const columns = [{
    Header: 'Nom',
    accessor: 'name',
    Cell: (n) => utils.capitalizeFirstLetter(n.value)
  }, {
    Header: 'Prix',
    accessor: 'price',
    sortMethod: (a,b) => (parseFloat(a) - parseFloat(b)),
    Cell: (price) => <span className="priceCell">{ utils.formatPrice(parseFloat(price.value)) }</span>
  }, {
    Header: 'Catégorie',
    accessor: 'category'
  }, {
    id: 'waitListSize',
    Header: 'Nb d\'interéssés',
    accessor: p => p.waitList ? p.waitList.length : 0
  }, {
    id: 'waitList',
    Header: 'Liste d\'attente',
    accessor: p => p.waitList ? p.waitList.map((p => p.name.split(' ')[0])).join(', ') : ''
  }]
  return (
    <div className="ProductListModal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <ReactTable
            data={ products }
            columns={ columns }
            showPagination={ false }
            defaultPageSize={ products.length }
            defaultSortMethod={ function(a, b) {
              return (typeof a === "string") ? a.localeCompare(b, "fr-FR") : a - b;
            } }
            style={{
              height: "75vh" // This will force the table body to overflow and scroll, since there is not enough room
            }}
          />
        </div>
      </div>
      <button className="modal-close is-large" onClick={ onClose } aria-label="close"></button>
    </div>
  );
}

export default ProductListModal;