import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';

import Login from './pages/Login';
import Register from './pages/Register';
import Newfeeds from './pages/Newfeeds';
import Header from './components/Header';

import './configs/axios.config';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5400/api/auth')
      .then((res) => {
        this.setState({ isAuth: true });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  onLogin() {
    this.setState({ isAuth: true });
  }

  onLogout() {
    this.setState({ isAuth: false });
  }

  render() {
    const { isAuth } = this.state;

    return (
      <Router history={history}>
        <div className="App">
          {isAuth && <Header onLogout={this.onLogout} />}
          <Switch>
            <Route exact path="/">
              <Newfeeds />
            </Route>
            <Route path="/auth/login">
              <Login onLogin={this.onLogin} />
            </Route>
            <Route path="/auth/register">
              <Register onLogin={this.onLogin} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export const history = createBrowserHistory();
export default App;
