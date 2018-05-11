import React from 'react';

import '../styles/Body.css';
import ProductList from './ProductList';
import Filter from './Filter';
import utils from '../utils/utils';

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      visibleProducts: [],
      chosenCategory: "all",
      sortBy: "name"
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.products !== null && newProps.products !== prevState.allProducts) {
      const visibleProducts = utils.sortProducts(
        utils.filterProducts(newProps.products, prevState.chosenCategory),
        prevState.sortBy
      );
      return {
        allProducts: newProps.products,
        visibleProducts
      };
    }
    return null;
  }

  handleCategoryDropdownChange = (ev) => {
    const chosenCategory = ev.target.value;
    const visibleProducts = utils.sortProducts(
      utils.filterProducts(this.state.allProducts, chosenCategory),
      this.state.sortBy
    );
    this.setState({ chosenCategory, visibleProducts });
  }

  handleSortDropdownChange = (ev) => {
    const sortBy = ev.target.value;
    this.setState((prevState) => {
      return {
        sortBy,
        visibleProducts: utils.sortProducts(prevState.visibleProducts, sortBy)
      }
    });
  }

  render() {
    return (
      <div className="Body">
        <section>
          <Filter 
            onCategoryDropdownChange={ this.handleCategoryDropdownChange }
            onSortDropdownChange={ this.handleSortDropdownChange }
            productCount={ this.state.visibleProducts.length }
          />
        </section>
        <section>
          <ProductList 
            user={ this.props.user }
            products={ this.state.visibleProducts }
            onEditClick={ this.props.onEditClick }
            onDeleteClick={ this.props.onDeleteClick }
            onReservationClick={ this.props.onReservationClick }
          />
        </section>
      </div>
    );
  }
}

export default Body;