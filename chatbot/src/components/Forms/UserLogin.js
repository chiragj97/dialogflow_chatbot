import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import decode from 'jwt-decode';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('http://localhost:5000/userRegistration/login', formData)
      .then((response) => {
        console.log("RR",response)
        if (response.data.errors) {
          this.setState(() => ({
            errors: response.data.errors,
            password: '',
          }));
        } else {
          // write this to localStorage
          //   const tokenData = decode(response.data.token);
          console.log(response.data)
          localStorage.setItem('token', response.data.token);
          // redirect to home page

          this.props.history.push('/home');
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
    const details = {
      width: '350px',
      padding: '20px 0px',
      background: 'transparent',
      borderBottom: '1px solid #435160',
      outline: 'none',
      color: '#ffffff',
      fontSize: '16px',
      border: 'none',
    };
    const login = {
      width: '350px',
      position: 'absolute',
      top: '10%',
      left: '50%',
      marginLeft: '-175px',
    };
    return (
      <div
        style={{
          background: '#332e2e',
          height: 669,
          width: 1299,
        }}
      >
        <div style={login}>
          <h1
            style={{
              color: 'white',
              fontFamily: 'Sofia',
              fontWeight: 'bolder',
              textAlign: 'center',
            }}
          >
            Login
          </h1>
          <form onSubmit={this.onFormSubmit}>
            <input
              style={details}
              type="email"
              value={this.state.email}
              onChange={this.onInputChange}
              placeholder="Email"
              name="email"
            />
            <br />
            <input
              // className="details"
              style={details}
              type="password"
              value={this.state.password}
              onChange={this.onInputChange}
              placeholder="Password"
              name="password"
            />
            <br />
            <br />
            <input
              style={{
                background: '#1fce6d',
                border: 0,
                width: 350,
                height: 40,
                borderRadius: 3,
                color: '#fff',
                fontSize: 12,
                cursor: 'pointer',
                transition: 'background 0.3s ease-in-out',
              }}
              type="Submit"
            />

            <Link
              style={{
                marginTop: 30,
                display: 'block',
                fontSize: 13,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              to="/userregistration"
            >
              Don't have an account ?
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default UserLogin;
