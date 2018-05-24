import React from 'react';
import PropTypes from 'prop-types';

export function ProductRow(props) {
  return (
    <div className="product-table__row">
      <input type="text" 
        className="form__input"
        name="displayName"
        value={props.product.displayName}
        onChange={props.handleDisplayNameChange}
      />
      <input type="text"
        className="form__input"
        name="sku"
        value={props.product.sku}
        onChange={props.handleSkuChange}
      />
      <input type="number"
        className="form__input"
        name="amount"
        value={props.product.cost.amount}
        onChange={props.handleAmountChange}
      />
      <select name="inDevelopment"
          className="form__input"
          value={props.product.inDevelopment}
          onChange={props.handleInDevelopmentChange}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <select name="broadcast"
          className="form__input"
          value={props.product.broadcast}
          onChange={props.handleBroadcastChange}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}

ProductRow.propTypes = {
  product: PropTypes.object
}