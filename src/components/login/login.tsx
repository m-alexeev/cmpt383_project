import './login.css';
import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";


function LoginPage() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <header className="login-page">

        <form onSubmit={handleSubmit}>
          <p>
            Please Login!
          </p>
          <FormGroup controlId="email" >
            <FormControl
              placeholder="Enter Email"
              autoFocus
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormControl
              placeholder="Enter Password"
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type='submits'>
            Login
          </Button>
        </form>
      </header>
    </div>
  )
}

export default LoginPage; 