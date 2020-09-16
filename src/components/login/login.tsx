import './login.css';
import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";


interface IProps {

}

interface IState {
  user: {
    email: string;
    password: string;
  }
  submitted: boolean
}


class LoginPage extends React.Component<IProps, IState>{

  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }


  handleSubmit(event) {
    event.stopPropagation();
    if (this.validate()) {
      event.preventDefault();
      this.setState({ submitted: true });
      fetch('/login', {
        method : 'post',
        body: JSON.stringify(this.state.user)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        
      });
    }
  }


  validate() {
    let isValid = true;
    let user = this.state.user;

    if (user.password.length === 0) {
      isValid = false;
    }

    if (user.email.length === 0) {
      isValid = false;
    }
    return isValid;
  }


  render() {
    const user = this.state.user;
    return (
      <div className="Login">
        <header className="login-page">
          <form onSubmit={this.handleSubmit}  method= 'post'>
            <p>
              Please Login!
          </p>
            <FormGroup controlId="email" >
              <FormControl
                placeholder="Email"
                autoFocus
                name = 'email'
                type='email'
                value={user.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId='password'>
              <FormControl
                placeholder="Password"
                name = 'password'
                value={user.password}
                type='password'
                onChange={this.handleChange}
              >
              </FormControl>
            </FormGroup>

          </form>
          <Button block onClick={this.handleSubmit} type='submit'>
            Login
          </Button>
        </header>
      </div>
    )
  }
}

export default LoginPage; 