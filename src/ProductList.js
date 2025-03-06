import React, { Component } from 'react';
import ProductDetail from './ProductDetail';
import StoreFilter from './StoreFilter';
import SearchBar from './SearchBar';

const mockProducts = [
  { id: 1, name: "Product A", description: "Description A", price: 100, store: "Store A" },
  { id: 2, name: "Product B", description: "Description B", price: 50, store: "Store B" },
  // Add more mock products as needed
];

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      selectedStore: '',
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  handleFilterChange = (e) => {
    this.setState({ selectedStore: e.target.value });
  }

  render() {
    const { searchQuery, selectedStore } = this.state;
    const filteredProducts = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStore = selectedStore ? product.store === selectedStore : true;
      return matchesSearch && matchesStore;
    });

    return (
      <div className="product-list">
        <h2>Product List</h2>
        <StoreFilter onFilterChange={this.handleFilterChange} />
        <SearchBar onSearchChange={this.handleSearchChange} />
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <ProductDetail product={product} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
