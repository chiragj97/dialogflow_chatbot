import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';

export class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantID: '',
      orders: [],
    };
  }

  componentDidMount() {
    this.setState({
      restaurantID: decode(localStorage.getItem('token'))._id,
    });

    axios
      .get('http://localhost:5000/orders/display_orders')
      .then((response) => {
        this.setState({
          orders: response.data.filter(
            (order) => order.itemID.restaurantID === this.state.restaurantID
          ),
        });
      });
  }

  render() {
    console.log('orders', this.state.orders);
    return (
      <div className="dashboard-body">
        <div className="dashboard-contents" style={{ width: '900px' }}>
          <br />
          <h2 style={{ fontWeight: 'bold' }}>Orders</h2>
          <br />
          <table
            className="table table-striped table-dark"
            style={{ fontSize: 17 }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item Name</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Location</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, i) => (
                <tr key={order._id}>
                  <td>{i + 1}</td>
                  <td>{order.itemID.itemName}</td>
                  <td>{order.userID.firstName}</td>
                  <td>{order.locality}</td>
                  <td>{order.itemID.price}</td>
                  <td>{moment(order.createdAt).format('Do MMMM YYYY')}</td>
                  {order.orderConfirmed === 'Confirmed' ? (
                    <td
                      className="badge badge-success"
                      style={{ marginTop: 4 }}
                    >
                      {order.orderConfirmed}
                    </td>
                  ) : (
                    <td className="badge badge-danger" style={{ marginTop: 4 }}>
                      {order.orderConfirmed}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Order;
