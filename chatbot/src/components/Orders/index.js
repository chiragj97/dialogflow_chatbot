import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import moment from 'moment';

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    let userID = {
      userID: decode(localStorage.getItem('token'))._id,
    };
    axios
      .post('http://localhost:5000/orders/userorders', userID)
      .then((response) => {
        console.log('Order Details', response.data);
        this.setState({
          orders: response.data,
          dataLoaded: true,
        });
      });
  }

  render() {
    // console.log('Orders render', this.state.orders[0]);
    return this.state.dataLoaded ? (
      this.state.orders.length !== 0 ? (
        <div className="container">
          <br />
          <table className="table table-striped">
            <thead style={{ backgroundColor: 'darkblue', color: 'white' }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Restaurant</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{order.itemID.itemName}</td>
                  <td>{order.itemID.restaurantID.restaurantName}</td>
                  <td>{order.itemID.menuType}</td>
                  <td>{order.itemID.price}</td>
                  <td>{moment(order.createdAt).format('Do MMMM YYYY')}</td>
                  {order.orderConfirmed === 'Confirmed' ? (
                    <td
                      className="badge badge-success"
                      style={{ marginTop: 3 }}
                    >
                      {order.orderConfirmed}
                    </td>
                  ) : (
                    <td className="badge badge-danger" style={{ marginTop: 3 }}>
                      {order.orderConfirmed}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container" style={{ textAlign: 'center' }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h3 style={{ color: 'lightblue', fontWeight: 'bold' }}>
            Your Order history is empty!
          </h3>
        </div>
      )
    ) : (
      <div className="text-center" style={{ paddingTop: 100 }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Orders;
