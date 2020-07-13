import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import instagram from '../assets/icons/instagram.png';

import '../css/Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userName: '',
      password: '',
      rePassword: '',
      error: '',
      registerSuccess: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, userName, password, rePassword } = this.state;
    const data = { email, userName, password, rePassword };

    axios
      .post('http://localhost:5400/api/auth/register', data)
      .then((res) => {
        const { onLogin } = this.props;
        const storageKey = 'jwtToken';
        const jwtToken = res.data;
        localStorage.setItem(storageKey, jwtToken);
        this.setState({ registerSuccess: true });
        onLogin();
      })
      .catch((err) => {
        const error = err.response.data;
        this.setState({
          email: '',
          userName: '',
          password: '',
          rePassword: '',
          error,
        });
      });
  }

  render() {
    const {
      email,
      userName,
      password,
      rePassword,
      error,
      registerSuccess,
    } = this.state;

    return (
      <div className="Register">
        {registerSuccess && <Redirect to="/" />}
        <div className="Wrapper">
          <Form onSubmit={this.handleSubmit}>
            <div className="ImgWrapper">
              <img src={instagram} alt="instagram" />
            </div>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="abc@example.com"
                value={email}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="userName">User name</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="abc.xyz_done"
                value={userName}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="rePassword">Retype password</Label>
              <Input
                type="password"
                name="rePassword"
                id="rePassword"
                placeholder="password"
                value={rePassword}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            {error && (
              <FormText color="danger" className="my-3">
                {error}
              </FormText>
            )}
            <Button type="submit" color="primary">
              Register
            </Button>
          </Form>
          <div className="ExtraBox">
            <p>
              You have had account? <Link to="/auth/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
