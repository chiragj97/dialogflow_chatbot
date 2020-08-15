import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';

export default class RestaurantDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantID: '',
      orders: [],
      customers: [],
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

    axios
      .get('http://localhost:5000/orders/display_customers')
      .then((response) => {
        this.setState({
          customers: response.data,
        });
      });
  }

  confirmOrder = (orderID) => {
    const details = {
      orderID: orderID,
    };
    axios
      .post('http://localhost:5000/orders/confirmorder', details)
      .then((response) => console.log(response));
  };

  cancelOrder = (orderID) => {
    const details = {
      orderID: orderID,
    };
    axios
      .post('http://localhost:5000/orders/cancelorder', details)
      .then((response) => console.log(response));
  };

  render() {
    return (
      <div className="dashboard-body" style={{ height: 1300, width: 985 }}>
        <div className="dashboard-contents" style={{ width: '880px' }}>
          <br />
          <h2 style={{ fontWeight: 'bold' }}>Recent Orders</h2>
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
                  <td>{moment(order.createdAt).format('Do MMMM - HH:MM')}</td>
                  {order.orderConfirmed === 'Pending' ? (
                    <td>
                      <button
                        onClick={() => this.confirmOrder(order._id)}
                        className="btn btn-success"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => this.cancelOrder(order._id)}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </td>
                  ) : (
                    <div>
                      {order.orderConfirmed === 'Confirmed' ? (
                        <td
                          className="badge badge-success"
                          style={{ marginTop: 4 }}
                        >
                          {order.orderConfirmed}
                        </td>
                      ) : (
                        <td
                          className="badge badge-danger"
                          style={{ marginTop: 4 }}
                        >
                          {order.orderConfirmed}
                        </td>
                      )}
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-contents" style={{ width: 600 }}>
          <br />
          <h2 style={{ fontWeight: 'bold' }}>Customers</h2>
          <table 
            className="table table-striped table-dark"
            style={{ fontSize: 17 }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Address</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map((customer, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td>{customer.address}</td>
                  <td>{customer.locality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
