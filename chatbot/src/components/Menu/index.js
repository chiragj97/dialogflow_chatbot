import React, { Component } from 'react';
import axios from 'axios';

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantCategories: [],
      dataLoaded: false,
    };
    console.log(this.props);
  }

  componentDidMount() {
    if (this.props.location.state) {
      let restaurantID = {
        restaurantID: this.props.location.state.restaurantID,
      };
      axios
        .post('http://localhost:5000/menu/show_restaurantmenu', restaurantID)
        .then((response) => {
          console.log(response.data);
          this.setState({
            restaurantCategories: response.data.menu,
            dataLoaded: true,
          });
        });
    } else {
      this.setState({
        dataLoaded: true,
      });
    }
  }

  render() {
    return this.state.dataLoaded ? (
      <div className="container">
        <br />
        <div style={{ paddingLeft: '5px' }}>
          <div className="form-row">
            {this.state.restaurantCategories.map((category) => {
              return (
                <div>
                  <div
                    key={category._id}
                    className="card"
                    style={{ width: '14rem' }}
                  >
                    {/* <img src={} className="card-img-top" alt={} /> */}
                    <div className="card-body">
                      <h5 className="card-title">{category.categoryName}</h5>

                      <button
                        type="button"
                        data-toggle="collapse"
                        data-target={`#${category.categoryName
                          .split(' ')
                          .join('')}`}
                        className="btn btn-primary btn-block"
                        aria-expanded="false"
                        aria-controls={category.categoryName
                          .split(' ')
                          .join('')}
                      >
                        See More
                      </button>
                    </div>
                  </div>
                  &nbsp;
                  <div
                    className="collapse multi-collapse"
                    id={category.categoryName.split(' ').join('')}
                  >
                    <div className="card card-body">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item </th>
                            <th scope="col">Type</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.itemID.map((item, i) => (
                            <tr
                              style={{ cursor: 'pointer' }}
                              data-toggle="modal"
                              data-target={`#${item.itemName
                                .split(' ')
                                .join('')}`}
                            >
                              <th scope="row">{i + 1}</th>
                              <td>{item.itemName}</td>
                              <td>{item.menuType}</td>
                              <td>{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {category.itemID.map((item, i) => (
                      <div
                        className="modal fade"
                        id={item.itemName.split(' ').join('')}
                        tabIndex="-1"
                        role="dialog"
                        // aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">{item.itemName}</h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div
                                className="container-fluid"
                                style={{ height: 200 }}
                              >
                                Item Image
                              </div>
                            </div>
                            <div className="modal-footer">
                              <h6>
                                Type "Add {item.itemName} from{' '}
                                {item.restaurantID.restaurantName}" to add this
                                item in your cart
                              </h6>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center" style={{ paddingTop: 100 }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Menu;
