import React, { Component } from 'react';
import './component.sass';
import { ProductRow } from './product-row';

export class ProductTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {"domain": "twitch.ext.dppeppelTest", "sku": "test1", "cost": {"amount": 1, "type": "bits"}, "inDevelopment": "false", "displayName": "Test 1"},
        {"domain": "twitch.ext.dppeppelTest", "sku": "test2", "cost": {"amount": 4, "type": "bits"}, "inDevelopment": "true", "displayName": "Test 1", "broadcast": "true"},
        {"domain": "twitch.ext.dppeppelTest", "sku": "test3", "cost": {"amount": 5000, "type": "bits"}, "inDevelopment": "true", "displayName": "Test 1", "broadcast": "true"},
        {"domain": "twitch.ext.dppeppelTest", "sku": "test4", "cost": {"amount": 1, "type": "bits"}, "displayName": "Test 1"}
      ]
    };
  }

  handleDisplayNameChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product['displayName'] = value;
      return {products: products};
    });
  }

  handleSkuChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product['sku'] = value;
      return {products: products};
    });
  }

  handleAmountChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product['cost']['amount'] = value;
      return {products: products};
    });
  }

  handleInDevelopmentChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product['inDevelopment'] = value;
      return {products: products};
    });
  }

  handleBroadcastChange(index, event) {
    let value = event.target.value;
    this.setState((prevState, props) => {
      let products = [...prevState['products']];
      let product = products[index];
      product['broadcast'] = value;
      return {products: products};
    });
  }

  render() {
    let productRows = this.state.products.map((p, i) => {
      return (
        <ProductRow key={p.sku} product={p}
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
        <div className="product-table__header">
          <div className="text">Product Name</div>
          <div className="text">SKU</div>
          <div className="text">Amount (In Bits)</div>
          <div className="select">In Development</div>
          <div className="select">Broadcast</div>
        </div>
        {productRows}
      </div>
    );
  }
}