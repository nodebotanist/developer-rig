import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.sass';
import { ProductRow } from './product-row';
import { fetchProducts } from '../util/api';

export class ProductTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      error: ''
    };
  }

  componentDidMount() {
    fetchProducts(
      'api.twitch.tv',
      this.props.clientId,
      this.handleFetchProductsSuccess.bind(this),
      this.handleFetchProductsError.bind(this)
    );
  }

  handleFetchProductsSuccess(products) {
    this.setState({
      products: products,
      error: ''
    });
  }

  handleFetchProductsError(error) {
    this.setState({
      error: error
    });
  }

  handleDisplayNameChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product.displayName = value;
      return {products: products};
    });
  }

  handleSkuChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product.sku = value;
      return {products: products};
    });
  }

  handleAmountChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product.amount = value;
      return {products: products};
    });
  }

  handleInDevelopmentChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product.inDevelopment = value;
      return {products: products};
    });
  }

  handleBroadcastChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product.broadcast = value;
      return {products: products};
    });
  }

  handleAddProductClick(event) {
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = {
        sku: "",
        amount: 1,
        inDevelopment: "true",
        displayName: "",
        broadcast: "true"
      };
      products.push(product)
      return {products: products};
    });
  }

  render() {
    let productRows = this.state.products.map((p, i) => {
      return (
        <ProductRow key={i} product={p}
          handleDisplayNameChange={this.handleDisplayNameChange.bind(this, i)}
          handleSkuChange={this.handleSkuChange.bind(this, i)}
          handleAmountChange={this.handleAmountChange.bind(this, i)}
          handleInDevelopmentChange={this.handleInDevelopmentChange.bind(this, i)}
          handleBroadcastChange={this.handleBroadcastChange.bind(this, i)}
        />
      );
    });

    return (
      <div className="product-table">
        {this.state.error &&
          <div className="product-table__error">
            <h4>Error getting products.</h4>
            <p>{this.state.error}</p>
          </div>
        }
        <div className="product-table__header">
          <div className="text">Product Name</div>
          <div className="text">SKU</div>
          <div className="text">Amount (in Bits)</div>
          <div className="select">In Development</div>
          <div className="select">Broadcast</div>
        </div>
        {productRows}
        <button className="product-table__add-btn" onClick={this.handleAddProductClick.bind(this)}>
          Add Product
        </button>
      </div>
    );
  }
}

ProductTable.propTypes = {
  clientId: PropTypes.string,
  token: PropTypes.string
}