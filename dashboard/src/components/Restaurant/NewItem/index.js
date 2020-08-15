import React, { Component } from 'react';
import '../../css/dashboard.css';
import axios from 'axios';
import decode from 'jwt-decode';

export class NewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: '',
      menuType: '',
      description: '',
      price: '',
      isAdded: '',
      restaurantID: '',
    };
  }

  componentDidMount() {
    this.setState({
      restaurantID: decode(localStorage.getItem('token'))._id,
    });
    console.log(this.state.restaurantID);
    axios
      .get('http://localhost:5000/restaurantcategory/getcategories/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            categories: response.data.filter(
              (category) =>
                category.restaurantID._id === this.state.restaurantID
            ),
          });
        }
      });
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      restaurantID: this.state.restaurantID,
      categoryID: this.state.categoryID,
      itemName: this.state.itemName,
      menuType: this.state.menuType,
      description: this.state.description,
      price: this.state.price,
      isAdded: false,
    };

    axios
      .post('http://localhost:5000/items/add_item/', formData)
      .then((response) => console.log(response.data));
    this.setState(() => ({
      itemName: '',
      menuType: '',
      description: '',
      price: '',
    }));
  };

  render() {
    let categories = this.state.categories
      ? this.state.categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.categoryName}
          </option>
        ))
      : null;
    return (
      <div className="dashboard-body">
        <div className="dashboard-contents">
          <br />
          <h2 style={{ fontWeight: 'bold' }}>New Item</h2>
          <hr />
          <h2>Select Category</h2>
          <form onSubmit={this.onFormSubmit}>
            <select
              className="input"
              required
              name="categoryID"
              value={this.state.name}
              onChange={this.onInputChange}
              style={{ fontSize: 15 }}
            >
              <option>Select Category</option>
              {categories}
            </select>
            <hr />
            <h2>Item Details</h2>

            <input
              className="input"
              type="text"
              placeholder="Item Name"
              onChange={this.onInputChange}
              name="itemName"
              value={this.state.itemName}
            />
            <input
              className="input"
              type="text"
              placeholder="Veg/Non-veg"
              onChange={this.onInputChange}
              name="menuType"
              value={this.state.menuType}
            />
            <input
              className="input"
              type="text"
              placeholder="Description"
              onChange={this.onInputChange}
              name="description"
              value={this.state.description}
            />
            <input
              className="input"
              type="text"
              placeholder="Price"
              onChange={this.onInputChange}
              name="price"
              value={this.state.price}
            />
            <input className="input" type="submit" style={{ width: 370 }} />
          </form>
        </div>
      </div>
    );
  }
}

export default NewItem;
