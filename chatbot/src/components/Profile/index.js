import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      accountConfirmation: false,
      dataLoaded: false,
    };
  }

  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    const url = 'http://localhost:5000/userRegistration/';
    axios.get(`${url}${id}`).then((response) => {
      this.setState({
        details: response.data,
        accountConfirmation: true,
        dataLoaded: true,
      });
    });
  }
  render() {
    return this.state.dataLoaded ? (
      <form onSubmit={this.onFormSubmit}>
        <br />
        <div className="container">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.firstName}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.lastName}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                readOnly
                value={this.state.details.email}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.mobile}
              />
            </div>
            <div className="form-group col-md-8">
              <label>Full Address</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.address}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Zip</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.zipcode}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Area</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.locality}
              />
            </div>
            <div className="form-group col-md-6">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={this.state.details.city}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    ) : (
      <div className="text-center" style={{ paddingTop: 100 }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Profile;
