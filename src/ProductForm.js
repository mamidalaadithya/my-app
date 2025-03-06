import React, { Component } from 'react';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., add or edit product)
    console.log('Product submitted:', this.state);
  }

  render() {
    return (
      <div className="product-form">
        <h2>Add/Edit Product</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" name="price" value={this.state.price} onChange={this.handleChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
