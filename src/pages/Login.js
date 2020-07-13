import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

import instagram from '../assets/icons/instagram.png';

import '../css/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loginSuccess: false,
      isAuth: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5400/api/auth')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    const data = { email, password };
    axios
      .post('http://localhost:5400/api/auth/login', data)
      .then((res) => {
        const storageKey = 'jwtToken';
        const jwtToken = res.data;
        localStorage.setItem(storageKey, jwtToken);
        this.setState({ loginSuccess: true });
        onLogin();
      })
      .catch((err) => {
        const error = err.response.data;
        this.setState({ email: '', password: '', rePassword: '', error });
      });
  }

  render() {
    const { email, password, error, loginSuccess } = this.state;

    return (
      <div className="Login">
        {loginSuccess && <Redirect to="/" />}
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
            {error && (
              <FormText color="danger" className="my-3">
                {error}
              </FormText>
            )}
            <Button type="submit" color="primary">
              Login
            </Button>
          </Form>
          <div className="ExtraBox">
            <p>
              You do not have account? <Link to="/auth/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
