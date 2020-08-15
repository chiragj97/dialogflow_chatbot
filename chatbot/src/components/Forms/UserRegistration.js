import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      address: '',
      locality: '',
      city: '',
      zipcode: '',
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  navigate() {
    this.props.history.push('/login');
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const details = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile,
      password: this.state.password,
      address: this.state.address,
      locality: this.state.locality,
      city: this.state.city,
      zipcode: this.state.zipcode,
    };

    axios
      .post('http://localhost:5000/userRegistration/add', details)
      .then(() => {
        this.navigate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const details = {
      width: '300px',
      padding: '20px 0px',
      background: 'transparent',
      borderBottom: '1px solid #435160',
      outline: 'none',
      color: '#ffffff',
      fontSize: '16px',
      border: 'none',
    };
    const login = {
      width: '800px',
      position: 'absolute',
      top: '10%',
      left: '20%',
    };
    return (
      <div
        className="container-fluid m-0 p-0"
        style={{ backgroundColor: '#332e2e' }}
      >
        <form onSubmit={this.onFormSubmit}>
          <div
            className="box container"
            style={{
              width: '600px',
              padding: '5.5%',
              paddingBottom: '11.3%',
            }}
          >
            <div
              className="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <h1
                style={{
                  color: 'white',
                  fontFamily: 'Sofia',
                  fontWeight: 'bolder',
                  textAlign: 'center',
                  // marginLeft: '35%',
                }}
              >
                Signup
              </h1>
            </div>

            <div
              className="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                  placeholder="First Name"
                  required={true}
                  name="firstName"
                />
              </div>
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                  placeholder="Last Name"
                  required={true}
                  name="lastName"
                />
              </div>
            </div>
            <div
              className="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="col-6">
                <input
                  style={details}
                  type="email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                  placeholder="Email"
                  required={true}
                  name="email"
                />
              </div>
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.mobile}
                  onChange={this.onInputChange}
                  placeholder="Mobile"
                  required={true}
                  name="mobile"
                />
              </div>
            </div>
            <div
              className="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.address}
                  onChange={this.onInputChange}
                  placeholder="Address"
                  required={true}
                  name="address"
                />
              </div>
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.locality}
                  onChange={this.onInputChange}
                  placeholder="Locality"
                  required={true}
                  name="locality"
                />
              </div>
            </div>
            <div
              className="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.city}
                  onChange={this.onInputChange}
                  placeholder="City"
                  required={true}
                  name="city"
                />
              </div>
              <div className="col-6">
                <input
                  style={details}
                  type="text"
                  value={this.state.zipcode}
                  onChange={this.onInputChange}
                  placeholder="Zipcode"
                  required={true}
                  name="zipcode"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <input
                  style={details}
                  type="password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                  placeholder="Password"
                  required={true}
                  name="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  className="container"
                  style={{
                    background: '#1fce6d',
                    border: 0,
                    // width: 350,
                    height: 40,
                    borderRadius: 3,
                    color: '#fff',
                    fontSize: 12,
                    cursor: 'pointer',
                    transition: 'background 0.3s ease-in-out',
                  }}
                  type="Submit"
                />
              </div>
            </div>
            <div
              className="row"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="col">
                <Link
                  style={{
                    marginTop: 15,
                    display: 'block',
                    fontSize: 13,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    // marginLeft: '30%',
                  }}
                  to="/login"
                >
                  Already have an account ?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// <div
// style={{
//   background: '#332e2e',
//   height: 669,
//   width: 1299,
// }}
// >
// <div style={login}>
// <h1
//   style={{
//     color: 'white',
//     fontFamily: 'Sofia',
//     fontWeight: 'bolder',
//     // textAlign: 'center',
//     marginLeft: '35%',
//   }}
// >
//   Signup
// </h1>
//   <br />
//   <div style={{ marginLeft: '80px' }}>
//     <form onSubmit={this.onFormSubmit}>
// <input
//   style={details}
//   type="text"
//   value={this.state.firstName}
//   onChange={this.onInputChange}
//   placeholder="First Name"
//   required={true}
//   name="firstName"
// />
//       <input
//         style={details}
//         type="text"
//         value={this.state.lastName}
//         onChange={this.onInputChange}
//         placeholder="Last Name"
//         required={true}
//         name="lastName"
//       />
//       <br />
// <input
//   style={details}
//   type="email"
//   value={this.state.email}
//   onChange={this.onInputChange}
//   placeholder="Email"
//   required={true}
//   name="email"
// />

// <input
//   style={details}
//   type="text"
//   value={this.state.mobile}
//   onChange={this.onInputChange}
//   placeholder="Mobile"
//   required={true}
//   name="mobile"
// />
// <input
//   style={details}
//   type="text"
//   value={this.state.address}
//   onChange={this.onInputChange}
//   placeholder="Address"
//   required={true}
//   name="address"
// />
// <input
//   style={details}
//   type="text"
//   value={this.state.locality}
//   onChange={this.onInputChange}
//   placeholder="Locality"
//   required={true}
//   name="locality"
// />
// <input
//   style={details}
//   type="text"
//   value={this.state.city}
//   onChange={this.onInputChange}
//   placeholder="City"
//   required={true}
//   name="city"
// />
// <input
//   style={details}
//   type="text"
//   value={this.state.zipcode}
//   onChange={this.onInputChange}
//   placeholder="Zipcode"
//   required={true}
//   name="zipcode"
// />
//       <br />
// <input
//   style={details}
//   type="password"
//   value={this.state.password}
//   onChange={this.onInputChange}
//   placeholder="Password"
//   required={true}
//   name="password"
// />
//       <br />
// <input
//   style={{
//     background: '#1fce6d',
//     border: 0,
//     width: 350,
//     height: 40,
//     borderRadius: 3,
//     color: '#fff',
//     fontSize: 12,
//     cursor: 'pointer',
//     transition: 'background 0.3s ease-in-out',
//     marginLeft: '15%',
//   }}
//   type="Submit"
// />
// <Link
//   style={{
//     marginTop: 30,
//     display: 'block',
//     fontSize: 13,
//     // textAlign: 'center',
//     fontWeight: 'bold',
//     marginLeft: '30%',
//   }}
//   to="/login"
// >
//   Already have an account ?
// </Link>
//     </form>
//   </div>
// </div>
// </div>
