import React, { Component } from 'react';
import './component.sass';
import { ProductTable } from '../product-table-component';

export class ProductManagementViewContainer extends Component {
  render() {
    return (
      <div className='view-container-wrapper'>
        <div className='view-container'>
          <ProductTable />
        </div>
      </div>
    );
  }
}