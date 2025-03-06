import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <h2>Search Products</h2>
        <input
          type="text"
          placeholder="Search by name"
          onChange={this.props.onSearchChange}
        />
      </div>
    );
  }
}

export default SearchBar;
