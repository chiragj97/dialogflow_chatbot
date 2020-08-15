import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
    };
  }

  onChangeCategory = (e) => {
    this.setState({
      categoryName: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      restaurantID: decode(localStorage.getItem('token'))._id,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const category = {
      restaurantID: this.state.restaurantID,
      categoryName: this.state.categoryName,
    };
    console.log(category);

    axios
      .post('http://localhost:5000/restaurantcategory/addcategory', category)
      .then((res) => console.log(res.data));
    this.setState(() => ({
      categoryName: '',
    }));
  };

  render() {
    return (
      <div className="dashboard-body">
        <div className="dashboard-contents">
          <br />
          <h2 style={{ fontWeight: 'bold' }}>Add Category</h2>

          <hr />
          <h2>Category</h2>
          <br />
          <form onSubmit={this.onFormSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Category Name"
              onChange={this.onChangeCategory}
              value={this.state.categoryName}
            />
            <br />
            <br />

            <input
              style={{ width: 370 }}
              className="input"
              type="submit"
              value="Add Category"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddCategory;
