import './register.css'
import React from 'react';
import {Form, Button, FormGroup, FormControl } from "react-bootstrap";


interface IProps {

}

interface IState {
  user: {
    email: string;
    password: string;
    conf_password: string;

  };
  errors :{
    email: string;
    conf_password: string;
  }
  submitted: boolean
}


class RegisterPage extends React.Component<IProps, IState>{

  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        conf_password: '',
      },
      errors: {
        email: '',
        conf_password : '',
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
      // fetch('/register', {
      //   method: 'post',
      //   body: JSON.stringify(this.state.user)
      // }).then(function (response) {
      //   return response.json();
      // }).then(function (data) {

      //   console.log(data);
      // });
    }

  }



  validate() {
    let err = this.state.errors
    let isValid = true;
    let user = this.state.user;
    if (user.password !== user.conf_password) {
      isValid = false;
      err.conf_password = 'Passwords dont match';
    }
    if (user.password.length === 0) {
      isValid = false;
    }
    if (user.conf_password.length === 0) {
      isValid = false;
    }
    if (user.email.length === 0) {
      isValid = false;
    }
    err.conf_password = '';

    return isValid;
  }




  render() {
    const { user } = this.state;
    const err = this.state.errors;
    return (
      <div className="Register">
        <header className="RegisterBox">

          <form onSubmit={this.handleSubmit} method="post">
            <h2>
              Register!
           </h2>
            <FormGroup controlId="email" >
              <FormControl
                name='email'
                placeholder="Email"
                autoFocus
                type='email'
                value={user.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId='password'>
              <FormControl
                name='password'
                placeholder="Password"
                value={user.password}
                type='password'
                onChange={this.handleChange}
              >
              </FormControl>
            </FormGroup>
            <FormGroup controlId='password-match'>
              <FormControl
                name='conf_password'
                placeholder="Confirm Password"
                value={user.conf_password}
                type='password'
                onChange={this.handleChange}
                isInvalid={!!err.conf_password}

              >
              </FormControl>
              <Form.Control.Feedback type = 'invalid'>
                {err.conf_password}
              </Form.Control.Feedback>
            </FormGroup>
          </form>
          <Button block onClick={this.handleSubmit} >
            Register
          </Button>
        </header>
      </div>
    )
  }
}

export default RegisterPage;

//TODO: Replace the onSubmit with a onClick
// Add stopPropagation
// redirect on the callback