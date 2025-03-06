import React, { Component } from 'react';

class ProductDetail extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    );
  }
}

export default ProductDetail;
