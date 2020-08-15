import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.setState({
      restaurantID: decode(localStorage.getItem('token'))._id,
    });

    axios.get('http://localhost:5000/items/get_items').then((response) => {
      if (response.data) {
        this.setState({
          items: response.data.filter(
            (item) => item.restaurantID === this.state.restaurantID
          ),
        });
      }
    });
  }

  render() {
    let items = this.state.items;
    return (
      <div className="dashboard-body">
        <div className="dashboard-contents" style={{ width: '75%' }}>
          <br />
          <h2 style={{ fontWeight: 'bold' }}>Menu</h2>
          <br />
          <table
            className="table table-striped table-dark"
            style={{ fontSize: 17 }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.menuType}</td>
                  <td>{item.price}</td>
                  <td>{item.categoryID.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Menu;
