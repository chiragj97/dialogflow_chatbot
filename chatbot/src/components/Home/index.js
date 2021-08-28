import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      clickedVerify: false,
      userDetails: '',
      dataLoaded: false,
      enteredOTP: '',
    };
  }

  componentDidMount() {
   
    const id = decode(localStorage.getItem('token'))._id;
    const url = 'http://localhost:5000/userRegistration/';
    axios.get(`${url}${id}`).then((response) => {
      console.log(response.data);
      this.setState({
        userDetails: response.data,
        dataLoaded: true,
      });
    });
  }

  onOtpChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  verifyOTP = () => {
    const id = {
      id: decode(localStorage.getItem('token'))._id,
    };

    if (this.state.enteredOTP === this.state.otp.toString()) {
      axios
        .post('http://localhost:5000/userRegistration/verifyaccount', id)
        .then((response) => {
          console.log(response.data);
        });
    } else {
      alert('Incorrect OTP. Please try again');
      this.props.history.push('/home');
    }
  };

  sendMail = () => {
    let email = {
      email: decode(localStorage.getItem('token')).email,
    };
    console.log(email.email);
    axios
      .post('http://localhost:5000/userRegistration/send-mail', email)
      .then((response) => {
        console.log(response.data);
        this.setState({
          otp: response.data,
          clickedVerify: true,
        });
      });
  };

  render() {
    const percentage = 37.5;
    const percentage1 = 33;
    const percentage2 = 25;
    const percentage3 = 22.5;
    return this.state.dataLoaded ? (
      this.state.userDetails.accountConfirmation ? (
        <div className="container">
          <br />
          <div
            style={{
              boxShadow: '0px 0px 4px 2px #b9acac',
              padding: '10px 25px 10px 30px',
            }}
          >
            <h5 style={{ marginLeft: -15 }}>Favourite Orders</h5>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <h6 style={{ textAlign: 'center' }}>Pizza Marinara</h6>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                />
              </div>
              <div className="col-md-3">
                <h6 style={{ textAlign: 'center' }}>Mutter Paneer</h6>
                <CircularProgressbar
                  value={percentage1}
                  text={`${percentage1}%`}
                />
              </div>
              <div className="col-md-3">
                <h6 style={{ textAlign: 'center' }}>Lasagna</h6>
                <CircularProgressbar
                  value={percentage2}
                  text={`${percentage2}%`}
                />
              </div>
              <div className="col-md-3">
                <h6 style={{ textAlign: 'center' }}>Noodles</h6>
                <CircularProgressbar
                  value={percentage3}
                  text={`${percentage3}%`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : this.state.clickedVerify ? (
        <div className="container">
          <br />
          <form onSubmit={this.verifyOTP}>
            <div className="form-group col-md-7">
              <h1>Check your email!</h1>
              <p>
                We've sent a six-digit confirmation code on your email
                <strong> {this.state.userDetails.email}</strong>.
                <p>Enter it below to verify your account.</p>
              </p>
              <label>OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your OTP"
                name="enteredOTP"
                onChange={this.onOtpChange}
                value={this.state.enteredOTP}
              />
            </div>
            <button type="Submit" className="btn btn-primary">
              Verify Now
            </button>
          </form>
        </div>
      ) : (
        <div className="container">
          <br />
          <div className="card text-center">
            <div className="card-header" style={{ color: 'red' }}>
              !!!
            </div>
            <div className="card-body">
              <h5 className="card-title">Account Verification Pending</h5>
              <p className="card-text">
                Your account verification is pending. Please Click here to
                verify your account !
              </p>
              <button onClick={this.sendMail} className="btn btn-primary">
                Verify Now
              </button>
            </div>
          </div>
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

export default Home;
