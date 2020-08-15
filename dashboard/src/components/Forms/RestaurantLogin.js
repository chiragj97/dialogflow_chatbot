import React, { Component } from 'react';
import '../css/registration.css';
import axios from 'axios';
// import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

class RestaurantLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialEmail: '',
      password: '',
      errors: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      officialEmail: this.state.officialEmail,
      password: this.state.password,
    };

    axios
      .post('http://localhost:5000/restaurant/login', formData)
      .then((response) => {
        if (response.data.errors) {
          this.setState(() => ({
            errors: response.data.errors,
            password: '',
          }));
        } else {
          // write this to localStorage
          //   const tokenData = decode(response.data.token);
          localStorage.setItem('token', response.data.token);
          // redirect to contacts page
          this.props.history.push('/restaurant/dashboard');
          window.location.reload();
          // change the navigation links = update the state of isAuthenticated in the parent component
          //   this.props.onAuthentication(true, tokenData.roles);
        }
      });
  };

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="details"
            type="email"
            value={this.state.email}
            onChange={this.onInputChange}
            placeholder="Email"
            name="officialEmail"
          />
          <br />
          <input
            className="details"
            type="password"
            value={this.state.password}
            onChange={this.onInputChange}
            placeholder="Password"
            name="password"
          />
          <br />
          <br />
          <input type="Submit" />

          <Link className="forgot" to="/home/restaurantregistration">
            Don't have an account ?
          </Link>
        </form>
      </div>
    );
  }
}

export default RestaurantLogin;
