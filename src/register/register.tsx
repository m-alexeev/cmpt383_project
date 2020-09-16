import './register.css'
import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Console } from 'console';


interface IProps {

}

interface IState {
  user: {
    email: string;
    password: string;
    conf_password: string

  };
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
      fetch('/register', {
        method: 'post',
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
    if (user.password !== user.conf_password) {
      isValid = false;
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

    return isValid;
  }




  render() {
    const { user, submitted } = this.state;
    return (
      <div className="Register">
        <header className="register-page">

          <form onSubmit={this.handleSubmit} method="post">
            <p>
              Register!
        </p>
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
              >
              </FormControl>
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