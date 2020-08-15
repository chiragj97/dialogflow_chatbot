import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  onFormSubmit(e) {
    const id = decode(localStorage.getItem('token'))._id;
    const url = 'http://localhost:5000/userRegistration/changepassword';
    e.preventDefault();
    const formData = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
    };
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <br />
        <div className="container">
          <div className="border rounded">
            <br />
            <div className="form-group col-md-6">
              <label>Old Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Old Password"
                value={this.state.oldPassword}
                onChange={this.onInputChange}
                name="oldPassword"
              />
            </div>

            <hr />
            <div className="form-group col-md-6">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={this.state.newPassword}
                onChange={this.onInputChange}
                name="newPassword"
              />
            </div>
            <div className="form-group col-md-6">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.onInputChange}
                name="confirmPassword"
              />
              <br />
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </div>
      </form>
    );
  }
}

export default ChangePassword;
