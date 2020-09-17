import './login.css';
import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

interface IProps {

}

interface IState {
  user: {
    email: string;
    password: string;
  }
  submitted: boolean
  error: string
  redirect : string
}


class LoginPage extends React.Component<IProps, IState>{

  constructor(props) {
    super(props);

    this.state = {

      user: {
        email: '',
        password: '',
      },
      redirect : '',
      submitted: false,
      error: '',
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


  async handleSubmit(event) {
    event.stopPropagation();
    if (this.validate()) {
      event.preventDefault();
      this.setState({ submitted: true });

      
      let data = await this.fetch_request();
      
      //Set the error
      this.setState({
        error: await data['err'],
        redirect : await data['redirect']
      });
    }
  }


  async fetch_request() {
    let data = await fetch('/login', {
      method: 'post',
      body: JSON.stringify(this.state.user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      return data;
    }).catch(error => console.warn(error));
    
    return data;
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
    let err = this.state.error;

    if (this.state.redirect){
      return <Redirect to = {this.state.redirect}/>
    }

    return (
      <div className="Login">
        <div className="LoginBox">
          <form onSubmit={this.handleSubmit} method='post'>
            <h2>
              Please Login! 
          </h2>
            <FormGroup controlId="email" >
              <FormControl
                placeholder="Email"
                autoFocus
                name='email'
                type='email'
                value={user.email}
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId='password'>
              <FormControl
                placeholder="Password"
                name='password'
                value={user.password}
                type='password'
                onChange={this.handleChange}
              >
              </FormControl>
            </FormGroup>
            <p className = 'error'>{err}</p>
          </form>
          <Button block onClick={this.handleSubmit} type='submit'>
            Login
          </Button>
        </div>
      </div>
    )
  }
}

export default LoginPage; 