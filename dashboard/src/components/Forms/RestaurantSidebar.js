import React, { Component } from 'react';
import '../css/dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';

export default class RestaurantSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const restaurantID = decode(localStorage.getItem('token'))._id;
    const url = 'http://localhost:5000/restaurant/';
    axios.get(`${url}${restaurantID}`).then((response) => {
      this.setState({
        details: response.data,
      });
    });
  }

  render() {
    return (
      <div id="wrapper" className="toggled">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <h3>
                <Link
                  style={{ fontWeight: 'bolder' }}
                  to="/restaurant/dashboard"
                >
                  {this.state.details.restaurantName}
                </Link>
              </h3>
            </li>
            <ul className="sidebar-contents">
              <li>
                <h3>
                  <Link to="/restaurant/dashboard">Dashboard</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/restaurant/menu">Menu</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/restaurant/orders">Orders</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/restaurant/addproduct">Add Product</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/restaurant/addcategory">Add Category</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/restaurant/newprod">New Item</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/restaurant/logout"> .Logout</Link>
                </h3>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
}
