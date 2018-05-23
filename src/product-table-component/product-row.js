import React from 'react';
import PropTypes from 'prop-types';

export function ProductRow(props) {
  return (
    <tr>
      <td>
        <input type="text" 
          name="displayName"
          value={props.product.displayName}
          onChange={props.handleDisplayNameChange}
        />
      </td>
      <td>
        <input type="text"
          name="sku"
          value={props.product.sku}
          onChange={props.handleSkuChange}
        />
      </td>
      <td>
        <input type="number"
          name="amount"
          value={props.product.cost.amount}
          onChange={props.handleAmountChange}
        />
      </td>
      <td>
        <select name="inDevelopment" value={props.product.inDevelopment} onChange={props.handleInDevelopmentChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>
      <td>
        <select name="broadcast" value={props.product.broadcast} onChange={props.handleBroadcastChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>
    </tr>
  );
}

ProductRow.propTypes = {
  product: PropTypes.object
}