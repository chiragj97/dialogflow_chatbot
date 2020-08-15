import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RestaurantRegistration from './Forms/RestaurantRegistration';
import OtpConfirmation from './Forms/OtpConfirmation';
import AddProduct from './Restaurant/AddProduct';
import Menu from './Restaurant/Menu';
import Order from './Restaurant/Order';
import axios from 'axios';
import RestaurantDashboard from './Restaurant/RestaurantDashboard';
import RestaurantLogin from './Forms/RestaurantLogin';
import AddCategory from './Restaurant/AddCategory';
import NewItem from './Restaurant/NewItem';
// import Sidebar from './Sidebar';
import Roles from './Forms/Roles';
import RestaurantSidebar from './Forms/RestaurantSidebar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
    };
  }

  render() {
    return (
      <div>
        {localStorage.getItem('token') ? (
          <RestaurantSidebar />
        ) : (
          <Route exact path="/" component={Roles} />
        )}

        <div>
          <Switch>
            <Route
              exact
              path="/restaurant/dashboard"
              component={RestaurantDashboard}
            />
            <Route
              exact
              path="/restaurant/logout"
              render={(props) => {
                axios
                  .delete('http://localhost:5000/restaurant/logoutAll', {
                    headers: {
                      'x-auth': localStorage.getItem('token'),
                    },
                  })
                  .then((response) => {
                    localStorage.removeItem('token');
                    props.history.push('/home/restaurant/login');
                    window.location.reload();
                  });
              }}
            ></Route>
            <Route exact path="/restaurant/newprod" component={NewItem} />
            <Route exact path="/restaurant/menu" component={Menu} />
            <Route exact path="/restaurant/orders" component={Order} />
            <Route exact path="/restaurant/addproduct" component={AddProduct} />
            <Route
              exact
              path="/restaurant/addcategory"
              component={AddCategory}
            />
            <Route exact path="/otp-confirmation" component={OtpConfirmation} />
            <Route
              exact
              path="/home/restaurantregistration"
              component={RestaurantRegistration}
            />
            <Route
              exact
              path="/home/restaurant/login"
              component={RestaurantLogin}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
