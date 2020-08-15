import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

export class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartDetails: [],
      cartTotal: 0,
    };
  }

  viewCart = () => {
    let userID = {
      userID: decode(localStorage.getItem('token'))._id,
    };

    axios
      .post('http://localhost:5000/userRegistration/viewcart', userID)
      .then((response) => {
        this.setState((prevState) => ({
          cartDetails: response.data.cart,
          ...prevState.cartDetails,
        }));
        this.setState({
          cartTotal: 0,
        });
        this.state.cartDetails.map((item) => {
          this.setState({
            cartTotal: this.state.cartTotal + item.price,
          });
        });
      });
  };

  render() {
    console.log(this.state.cartTotal);
    return (
      <div className="form-row" style={{ display: 'inline' }}>
        <div className="card" style={{ width: '80%', border: 'none' }}>
          <div
            className="card-body"
            style={{
              padding: 10,
              background: 'lightblue',
              borderRadius: '8px 8px 0px 0px',
            }}
          >
            <h6 className="card-text">{this.props.viewcart.title}</h6>
          </div>

          <button
            className="btn btn-link"
            style={{
              borderRadius: '0px 0px 5px 5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '1px solid lightblue',
            }}
            data-toggle="modal"
            data-target={`#${this.props.viewcart.subtitle}`}
            onClick={this.viewCart}
          >
            View Cart
          </button>
        </div>
        <div
          className="modal fade"
          id={`${this.props.viewcart.subtitle}`}
          tabIndex="-1"
          role="dialog"
          // aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Cart</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid" style={{ height: 200 }}>
                  {this.state.cartDetails.length !== 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Item </th>
                          <th scope="col">Type</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.cartDetails.map((item, i) => (
                          <tr key={item._id}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.itemName}</td>
                            <td>{item.menuType}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ color: 'grey', fontWeight: 'bold' }}>
                      <br />
                      <h4>Your Cart is empty !!!</h4>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <h4>Total : &#x20b9;{`${this.state.cartTotal}/-`}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCart;
