import React from 'react';
import { Link } from 'react-router-dom';

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigate(e) {
    window.location.href = 'http://localhost:3000/userregistration';
  }

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <h1>
          <Link onClick={this.navigate}>Order your Food</Link>
        </h1>

        <br />
        <h1>
          <Link to="/home/restaurantregistration">
            Register your Restaurant
          </Link>
        </h1>
      </div>
    );
  }
}

export default Roles;
