import React, { Component } from 'react';
import { jsPDF } from 'jspdf';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      storeName: '',
      username: '',
      password: '',
      loginError: '',
      invoices: [
        {
          id: 1,
          store: 'Store A',
          date: '2023-10-01',
          items: [
            { name: 'Item 1', quantity: 2, regularPrice: 10, dealPrice: 8, tax: 0.5 },
            { name: 'Item 2', quantity: 1, regularPrice: 20, dealPrice: 18, tax: 1 },
          ],
        },
        {
          id: 2,
          store: 'Store B',
          date: '2023-10-02',
          items: [
            { name: 'Item 3', quantity: 3, regularPrice: 15, dealPrice: 12, tax: 0.75 },
          ],
        },
      ],
      products: [
        { id: 1, store: 'Store A', name: 'Product 1', description: 'Description 1', price: 10 },
        { id: 2, store: 'Store B', name: 'Product 2', description: 'Description 2', price: 20 },
        { id: 3, store: 'Store C', name: 'Product 3', description: 'Description 3', price: 30 },
      ],
      filteredInvoices: [],
      filteredProducts: [],
      searchTerm: '',
      selectedStore: '',
      startDate: '',
      endDate: '',
      editingProduct: null, // Track the product being edited
    };
  }

  componentDidMount() {
    // Initialize filtered data with all invoices and products
    this.setState({
      filteredInvoices: this.state.invoices,
      filteredProducts: this.state.products,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    // Validate credentials
    if (username === 'Adithya' && password === 'password') {
      this.setState({
        loggedIn: true,
        loginError: '',
      });
    } else {
      this.setState({
        loginError: 'Invalid username or password',
      });
    }
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      storeName: '',
      username: '',
      password: '',
    });
  };

  handleSearch = (e) => {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm,
      filteredProducts: this.state.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    });
  };

  handleStoreFilter = (store) => {
    this.setState({
      selectedStore: store,
      filteredProducts: this.state.products.filter((product) => product.store === store),
    });
  };

  handleDateFilter = () => {
    const { startDate, endDate, invoices } = this.state;
    this.setState({
      filteredInvoices: invoices.filter(
        (invoice) => invoice.date >= startDate && invoice.date <= endDate
      ),
    });
  };

  generatePDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Invoice ID: ${invoice.id}`, 10, 10);
    doc.text(`Store: ${invoice.store}`, 10, 20);
    doc.text(`Date: ${invoice.date}`, 10, 30);
    invoice.items.forEach((item, index) => {
      doc.text(
        `${item.name} - Quantity: ${item.quantity} - Price: ${item.dealPrice} - Tax: ${item.tax}`,
        10,
        40 + index * 10
      );
    });
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  calculateTotal = (items) => {
    const totalWithoutTax = items.reduce((sum, item) => sum + item.dealPrice * item.quantity, 0);
    const totalTax = items.reduce((sum, item) => sum + item.tax * item.quantity, 0);
    return { totalWithoutTax, totalWithTax: totalWithoutTax + totalTax };
  };

  // Delete a product
  handleDeleteProduct = (productId) => {
    const { products } = this.state;
    const updatedProducts = products.filter((product) => product.id !== productId);
    this.setState({
      products: updatedProducts,
      filteredProducts: updatedProducts.filter((product) => product.store === this.state.storeName),
    });
  };

  // Edit a product
  handleEditProduct = (product) => {
    this.setState({ editingProduct: product });
  };

  // Save edited product
  handleSaveProduct = (updatedProduct) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.setState({
      products: updatedProducts,
      filteredProducts: updatedProducts.filter((product) => product.store === this.state.storeName),
      editingProduct: null, // Clear editing state
    });
  };

  render() {
    const {
      loggedIn,
      storeName,
      filteredInvoices,
      filteredProducts,
      searchTerm,
      selectedStore,
      startDate,
      endDate,
      editingProduct,
      username,
      password,
      loginError,
    } = this.state;

    const stores = ['Store A', 'Store B', 'Store C'];

    return (
      <div className="app">
        {!loggedIn ? (
          <div className="login">
            <h1>Login</h1>
            <form onSubmit={this.handleLogin}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </div>
              {loginError && <p className="error">{loginError}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="portal">
            <h1>Welcome, {storeName}</h1>
            <button onClick={this.handleLogout} className="logout-button">
              Logout
            </button>

            {/* Invoice Generation Portal */}
            <div className="invoice-portal">
              <h2>Invoice Generation Portal</h2>
              <div className="date-filter">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => this.setState({ startDate: e.target.value })}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => this.setState({ endDate: e.target.value })}
                />
                <button onClick={this.handleDateFilter}>Filter by Date</button>
              </div>
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="invoice">
                  <h3>Invoice ID: {invoice.id}</h3>
                  <p>Date: {invoice.date}</p>
                  {invoice.items.map((item, index) => (
                    <div key={index} className="invoice-item">
                      <p>
                        {item.name} - Quantity: {item.quantity} - Price: {item.dealPrice} - Tax:{' '}
                        {item.tax}
                      </p>
                    </div>
                  ))}
                  <p>Total without Tax: {this.calculateTotal(invoice.items).totalWithoutTax}</p>
                  <p>Total with Tax: {this.calculateTotal(invoice.items).totalWithTax}</p>
                  <button onClick={() => this.generatePDF(invoice)}>Generate PDF</button>
                </div>
              ))}
            </div>

            {/* Product Management Portal */}
            <div className="product-portal">
              <h2>Product Management Portal</h2>
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={this.handleSearch}
                />
                <select
                  value={selectedStore}
                  onChange={(e) => this.handleStoreFilter(e.target.value)}
                >
                  <option value="">All Stores</option>
                  {stores.map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </select>
              </div>
              {filteredProducts.map((product) => (
                <div key={product.id} className="product">
                  {editingProduct && editingProduct.id === product.id ? (
                    <div>
                      <input
                        type="text"
                        defaultValue={editingProduct.name}
                        onChange={(e) =>
                          this.setState({
                            editingProduct: { ...editingProduct, name: e.target.value },
                          })
                        }
                      />
                      <input
                        type="text"
                        defaultValue={editingProduct.description}
                        onChange={(e) =>
                          this.setState({
                            editingProduct: { ...editingProduct, description: e.target.value },
                          })
                        }
                      />
                      <input
                        type="number"
                        defaultValue={editingProduct.price}
                        onChange={(e) =>
                          this.setState({
                            editingProduct: { ...editingProduct, price: parseFloat(e.target.value) },
                          })
                        }
                      />
                      <button onClick={() => this.handleSaveProduct(editingProduct)}>Save</button>
                      <button onClick={() => this.setState({ editingProduct: null })}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>Price: {product.price}</p>
                      <button onClick={() => this.handleEditProduct(product)}>Edit</button>
                      <button onClick={() => this.handleDeleteProduct(product.id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;