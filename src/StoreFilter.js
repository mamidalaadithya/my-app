import React, { Component } from 'react';

class StoreFilter extends Component {
  render() {
    return (
      <div className="store-filter">
        <h2>Filter by Store</h2>
        <select onChange={this.props.onFilterChange}>
          <option value="">All Stores</option>
          <option value="Store A">Store A</option>
          <option value="Store B">Store B</option>
          {/* Add more store options as needed */}
        </select>
      </div>
    );
  }
}

export default StoreFilter;
