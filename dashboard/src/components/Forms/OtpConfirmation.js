import React, { Component } from 'react';
import '../css/registration.css';

export default class OtpConfirmation extends Component {
  constructor(props) {
    super(props);

    this.onChangeOtp = this.onChangeOtp.bind(this);

    this.state = {
      otp: '',
    };
  }

  onChangeOtp(e) {
    this.setState({
      otp: e.target.value,
    });
  }

  checkOtp(e) {
    e.preventDefault();

    window.location.href = 'http://localhost:3000/profile';
  }

  render() {
    return (
      <div className="login">
        <h1>Confirm OTP</h1>
        <form onSubmit={this.checkOtp}>
          <input
            className="details"
            type="text"
            value={this.state.otp}
            onChange={this.onChangeOtp}
            placeholder="Enter OTP"
          />
          <br />
          <input type="Submit" />
        </form>
      </div>
    );
  }
}
