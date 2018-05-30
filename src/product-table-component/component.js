import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.sass';
import { ProductRow } from './product-row';
import { fetchProducts, saveProduct } from '../util/api';

export class ProductTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [{
        sku: '',
        amount: 1,
        inDevelopment: 'true',
        displayName: '',
        broadcast: 'true'
      }],
      error: ''
    };
  }

  componentDidMount() {
    fetchProducts(
      'api.twitch.tv',
      this.props.clientId,
      this._handleFetchProductsSuccess.bind(this),
      this._handleFetchProductsError.bind(this)
    );
  }

  handleValueChange(index, event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    this.setState(prevState => {
      let products = [...prevState['products']];
      let product = products[index];
      product[fieldName] = value;
      product.dirty = true;
      return { products: products };
    });
  }

  handleAddProductClick(event) {
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = {
        sku: '',
        amount: 1,
        inDevelopment: 'true',
        displayName: '',
        broadcast: 'true',
        dirty: true
      };
      products.push(product)
      return { products: products };
    });
  }

  handleSaveProductsClick(event) {
    const dirtyProducts = this.state.products.map((p, i) => {
      if (p.dirty) {
        p.saving = true
        saveProduct(
          'api.twitch.tv',
          this.props.clientId,
          this.props.token,
          p,
          this._handleSaveProductSuccess.bind(this, i),
          this._handleSaveProductError.bind(this, i)
        );
      }
      return p;
    });
    this.setState({
      products: dirtyProducts
    });
  }

  render() {
    let productRows = this.state.products.map((p, i) => {
      return (
        <ProductRow key={i} product={p} handleValueChange={this.handleValueChange.bind(this, i)} />
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
          <div className="text-col">Product Name</div>
          <div className="text-col">SKU</div>
          <div className="text-col">Amount (in Bits)</div>
          <div className="select-col">In Development</div>
          <div className="select-col">Broadcast</div>
          <div className="dirty-col"></div>
        </div>
        {productRows}
        <div className="product-table__buttons">
          <button className="product-table__add-button" onClick={this.handleAddProductClick.bind(this)}>
            Add Product
          </button>
          <button className="product-table__save-button" onClick={this.handleSaveProductsClick.bind(this)}>
            Save All
          </button>
        </div>
      </div>
    );
  }

  _handleFetchProductsSuccess(products) {
    this.setState({ products: products });
  }

  _handleFetchProductsError(error) {
    this.setState({ error: error });
  }

  _handleSaveProductSuccess(index) {
    this.setState(prevState => {
      let products = [...prevState['products']];
      let product = products[index];
      product.saving = false;
      product.dirty = false;
      return { products: products };
    });
  }

  _handleSaveProductError(index, error) {
    this.setState(prevState => {
      let products = [...prevState['products']];
      let product = products[index];
      product.saving = false;
      return { products: products };
    });
  }
}

ProductTable.propTypes = {
  clientId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}