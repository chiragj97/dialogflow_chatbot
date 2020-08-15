import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: 'nav-link',
      profile: 'nav-link',
      orders: 'nav-link',
      changepassword: 'nav-link',
      menu: 'nav-link',
    };
  }

  activeHome = () => {
    this.setState({
      home: 'nav-link active',
      profile: 'nav-link',
      orders: 'nav-link',
      changepassword: 'nav-link',
      menu: 'nav-link',
    });
  };
  activeProfile = () => {
    this.setState({
      home: 'nav-link ',
      profile: 'nav-link active',
      orders: 'nav-link',
      changepassword: 'nav-link',
      menu: 'nav-link',
    });
  };
  activeOrders = () => {
    this.setState({
      orders: 'nav-link active',
      home: 'nav-link ',
      profile: 'nav-link',
      changepassword: 'nav-link',
      menu: 'nav-link',
    });
  };
  activeChangePassword = () => {
    this.setState({
      home: 'nav-link ',
      profile: 'nav-link',
      orders: 'nav-link',
      changepassword: 'nav-link active',
      menu: 'nav-link',
    });
  };
  activeMenu = () => {
    this.setState({
      home: 'nav-link ',
      profile: 'nav-link',
      orders: 'nav-link',
      changepassword: 'nav-link',
      menu: 'nav-link active',
    });
  };

  render() {
    return (
      <div className="container">
        <div style={{ paddingTop: 10 }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                style={{ color: 'darkblue' }}
                className={this.state.home}
                to="/home"
                onClick={this.activeHome}
                name="home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={{ color: 'darkblue' }}
                className={this.state.profile}
                to="/profile"
                onClick={this.activeProfile}
                name="profile"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={{ color: 'darkblue' }}
                className={this.state.orders}
                to="/orders"
                onClick={this.activeOrders}
                name="orders"
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={{ color: 'darkblue' }}
                className={this.state.changepassword}
                to="/changepassword"
                onClick={this.activeChangePassword}
                name="changepassword"
              >
                Change Password
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={{ color: 'darkblue' }}
                className={this.state.menu}
                to="/menu"
                onClick={this.activeMenu}
                name="menu"
              >
                Menu
              </Link>
            </li>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
