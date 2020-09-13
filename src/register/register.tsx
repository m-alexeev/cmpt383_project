import './register.css'
import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";


function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_match, checkPassword] = useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0 && password == password_match;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }


  return (
    <div className="Register">
      <header className="register-page">

        <form onSubmit={handleSubmit}>
          <p>
            Register!
        </p>
          <FormGroup controlId="email" >
            <FormControl
              placeholder="Email"
              autoFocus
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormControl
              placeholder="Password"
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            >
            </FormControl>
          </FormGroup>
          <FormGroup controlId='password-match'>
            <FormControl
              placeholder="Confirm Password"
              value={password_match}
              type='password'
              onChange={e => checkPassword(e.target.value)}
            >
            </FormControl>
          </FormGroup>
          <Button block disabled={!validateForm()} type='submits'>
            Register
          </Button>
        </form>
      </header>
    </div>
  )
}

export default RegisterPage; 