import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserRegistration from './components/Forms/UserRegistration';
import UserLogin from './components/Forms/UserLogin';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import Profile from './components/Profile';
import axios from 'axios';
import ChangePassword from './components/ChangePassword';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Home from './components/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem('token') ? (
          <div className="row">
            <div className="col-5">
              <Chatbot />
            </div>
            <div className="col">
              <Header />
              <Switch>
                <Route
                  exact
                  path="/changepassword"
                  component={ChangePassword}
                />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/orders" component={Orders} />
                <Route
                  exact
                  path="/menu"
                  render={(props) => {
                    return <Menu {...props} getID={this.getID} />;
                  }}
                />
                <Route
                  exact
                  path="/logout"
                  render={(props) => {
                    axios
                      .delete(
                        'http://localhost:5000/userRegistration/logoutAll',
                        {
                          headers: {
                            'x-auth': localStorage.getItem('token'),
                          },
                        }
                      )
                      .then((response) => {
                        localStorage.removeItem('token');
                        props.history.push('/login');
                        window.location.reload();
                      });
                  }}
                ></Route>
              </Switch>
            </div>
          </div>
        ) : (
          <Switch>
            <Route exact path="/login" component={UserLogin} />
            <Route
              exact
              path="/userregistration"
              component={UserRegistration}
            />
          </Switch>
        )}
      </div>
    );
  }
}
