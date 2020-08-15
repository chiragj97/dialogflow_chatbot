import React, { Component } from 'react';
import '../css/registration.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class RestaurantRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      owner: '',
      officialEmail: '',
      contactDetails: '',
      addressLine1: '',
      addressLine2: '',
      locality: '',
      city: '',
      state: '',
      zipcode: '',
      password: '',
      confirmPassword: '',
      latitude: '',
      longitude: '',
    };
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  componentDidMount() {
    this.getMyLocation();
  }

  getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          this.setState({
            latitude: 'err-latitude',
            longitude: 'err-longitude',
          });
        }
      );
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const restaurantDetails = {
      restaurantName: this.state.restaurantName,
      owner: this.state.owner,
      officialEmail: this.state.officialEmail,
      contactDetails: this.state.contactDetails,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      locality: this.state.locality,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    console.log(restaurantDetails);

    axios
      .post('http://localhost:5000/restaurant/add', restaurantDetails)
      .then((res) => console.log(res.data));

    this.props.history.push('/home/restaurant/login');
  };

  render() {
    const { latitude, longitude } = this.state;

    return (
      <div className="login login-restaurant">
        <h1>Signup</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="details"
            type="text"
            value={this.state.restaurantName}
            onChange={this.onInputChange}
            placeholder="Restaurant Name"
            required={true}
            name="restaurantName"
          />

          <input
            className="details"
            type="text"
            value={this.state.owner}
            onChange={this.onInputChange}
            placeholder="Owner"
            required={true}
            name="owner"
          />
          <br />
          <input
            className="details"
            type="email"
            value={this.state.officialEmail}
            onChange={this.onInputChange}
            placeholder="Official Email Id"
            required={true}
            name="officialEmail"
          />

          <input
            className="details"
            type="text"
            value={this.state.contactDetails}
            onChange={this.onInputChange}
            placeholder="Contact Details"
            required={true}
            name="contactDetails"
          />
          <br />
          <input
            className="details"
            type="text"
            value={this.state.addressLine1}
            onChange={this.onInputChange}
            placeholder="Address Line 1"
            required={true}
            name="addressLine1"
          />

          <input
            className="details"
            type="text"
            value={this.state.addressLine2}
            onChange={this.onInputChange}
            placeholder="Address Line 2"
            name="addressLine2"
          />
          <br />
          <input
            className="details"
            type="text"
            value={this.state.locality}
            onChange={this.onInputChange}
            placeholder="Locality"
            required={true}
            name="locality"
          />

          <input
            className="details"
            type="text"
            value={this.state.city}
            onChange={this.onInputChange}
            placeholder="City "
            required={true}
            name="city"
          />
          <br />
          <input
            className="details"
            type="text"
            value={this.state.state}
            onChange={this.onInputChange}
            placeholder="State"
            required={true}
            name="state"
          />

          <input
            className="details"
            type="text"
            value={this.state.zipcode}
            onChange={this.onInputChange}
            placeholder="Zip Code"
            required={true}
            name="zipcode"
          />
          <br />
          <input
            className="details"
            type="password"
            value={this.state.password}
            onChange={this.onInputChange}
            placeholder="Password"
            required={true}
            name="password"
          />

          <input
            className="details"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.onInputChange}
            placeholder="Confirm Password"
            required={true}
            name="confirmPassword"
          />
          <br />
          <input
            className="details"
            type="text"
            // value={this.state.latitude}
            onChange={this.onInputChange}
            placeholder="Latitude"
            // required={true}
            name="latitude"
            value={latitude}
          />

          <input
            className="details"
            type="text"
            // value={this.state.longitude}
            onChange={this.onInputChange}
            placeholder="Longitude"
            // required={true}
            name="longitude"
            value={longitude}
          />
          <br />
          <br />
          {/* <input
              className="getCoordinates"
              type="Submit"
              value="Get Co-ordinates"
            /> */}

          <input className="animated" type="Submit" />
          <Link className="forgot" to="/home/restaurant/login">
            Already have an account ?
          </Link>
        </form>
      </div>
    );
  }
}
