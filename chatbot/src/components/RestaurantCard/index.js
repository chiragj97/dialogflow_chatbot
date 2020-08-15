import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    // console.log('restaurant', this.props.restaurant.title);
    return (
      <div className="form-row" style={{ display: 'inline' }}>
        <div
          className="card"
          style={{
            width: '65%',
            border: 'none',
            marginBottom: -15,
          }}
        >
          <div
            className="card-body"
            style={{
              padding: 10,
              background: 'lightblue',
              borderRadius: '8px 8px 0px 0px',
              paddingBottom: 0,
            }}
          >
            <h5 className="card-title">{this.props.restaurant.title}</h5>
          </div>
          <Link
            to={{
              pathname: '/menu',
              state: { restaurantID: this.props.restaurant.subtitle },
            }}
            className="btn btn-link"
            style={{
              borderRadius: '0px 0px 5px 5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '1px solid lightblue',
            }}
          >
            View Menu
          </Link>
        </div>
      </div>
    );
  }
}

export default RestaurantCard;
