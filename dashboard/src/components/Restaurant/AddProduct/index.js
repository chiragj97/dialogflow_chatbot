import React, { Component } from 'react';
import '../../css/dashboard.css';
import axios from 'axios';
import decode from 'jwt-decode';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      items: [],
      itemID: '',
      categoryID: '',
      details: {},
    };
  }

  componentDidMount() {
    this.setState({
      restaurantID: decode(localStorage.getItem('token'))._id,
    });
    const url = 'http://localhost:5000/restaurant/';

    axios.get(`${url}${this.state.restaurantID}`).then((response) => {
      this.setState({
        details: response.data,
      });
    });

    axios
      .get('http://localhost:5000/restaurantcategory/getcategories/')
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          this.setState({
            categories: response.data.filter(
              (category) =>
                category.restaurantID._id === this.state.restaurantID
            ),
          });
        }
      });

    axios.get('http://localhost:5000/items/get_items/').then((response) => {
      if (response.data) {
        this.setState({
          items: response.data.filter(
            (item) =>
              item.restaurantID === this.state.restaurantID &&
              item.isAdded === false
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
      itemID: this.state.itemID,
      isAdded: true,
    };

    console.log(formData);
    axios
      .put('http://localhost:5000/restaurantcategory/updatecategory', formData)
      .then((response) => console.log(response.data));

    axios
      .put('http://localhost:5000/menu/addmenu', formData)
      .then((response) => console.log('Menu', response.data));

    axios
      .post('http://localhost:5000/items/updateitem', formData)
      .then((response) => console.log(response.data));
  };

  render() {
    let categories = this.state.categories
      ? this.state.categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.categoryName}
          </option>
        ))
      : null;

    let items = this.state.items
      ? this.state.items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.itemName}
          </option>
        ))
      : null;

    return (
      <div className="dashboard-body">
        <div className="dashboard-contents">
          <br />
          <h2 style={{ fontWeight: 'bold' }}>Add Product</h2>
          <hr />
          <h2>Category</h2>
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
            <br />
            <hr />
            <br />
            <br />
            <h2>Select Item</h2>
            <select
              className="input"
              required
              name="itemID"
              value={this.state.name}
              onChange={this.onInputChange}
              style={{ fontSize: 15 }}
            >
              <option>Select Item</option>
              {items}
            </select>
            <br />
            <br />
            <input className="input" type="submit" style={{ width: 370 }} />
          </form>
        </div>
      </div>
    );
  }
}
