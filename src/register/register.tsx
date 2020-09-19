import './register.css'
import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {  useHistory } from 'react-router-dom';



export default function RegisterPage() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConfPassword] = useState("");
  const [emailErr, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [confPwdError, setConfPwdError] = useState("");


  const history = useHistory();


  function handleSubmit(e) {

    e.stopPropagation();
    if (validatePwd() && validateEmail()) {
      e.preventDefault();
      fetch('/register', {
        method: 'post',
        body: JSON.stringify({"email":email, "password":password})
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        
        console.log(data);
      });
    }
  }


  const isAuth = useCallback(async () =>{
    fetch("/getUser")
    .then((res) => res.json())
    .then((data) => {
      if (data.user !== undefined) {
          history.push('/');
      }
    });
  }, [history]);
  


  useEffect(() => {
    isAuth(); 
    validatePwd();
    validateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, conf_password, email]);


  //Password Validation
  function validatePwd() {

    if ( password.length < 8 && password.length > 0) {
      setPwdError("Password must be longer than 8 characters");
      return false;
    }
    else {
      setPwdError('');
    }
    if (conf_password.length > 0 && password !== conf_password) {
      setConfPwdError("Passwords dont match");
      return false;
    } else {
      setConfPwdError("");
    }
    if (conf_password.length === 0 || password.length === 0){
      return false; 
    }

    return true;
  }


  //Email Validation
  function validateEmail() {
    if (email.length === 0 || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailError("");
    }
    else {
      setEmailError("Email is Invalid");
      return false;
    }
    return true;
  }


  return (
    <div className="Register">
      <div className="RegisterBox">

        <Form method="post">
          <h2>
            Register!
           </h2>
          <FormGroup controlId="email" >
            <FormControl
              name='email'
              placeholder="Email"
              autoFocus
              type='email'
              onChange={e => setEmail(e.target.value)}
              isInvalid={!!emailErr}
            />
            <Form.Control.Feedback type='invalid'>
              {emailErr}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup controlId='password'>
            <FormControl
              name='password'
              placeholder="Password"
              type='password'
              onChange={e => setPassword(e.target.value)}
              isInvalid={!!pwdError}
            />
            <Form.Control.Feedback type='invalid'>
              {pwdError}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup controlId='password-match'>
            <FormControl
              name='conf_password'
              placeholder="Confirm Password"
              type='password'
              onChange={e => setConfPassword(e.target.value)}
              isInvalid={!!confPwdError}
            >
            </FormControl>
            <Form.Control.Feedback type='invalid'>
              {confPwdError}
            </Form.Control.Feedback>
          </FormGroup>
        </Form>
        <Button block onClick={e => handleSubmit(e)} type='submit' >
          Register
          </Button>
          <p className = 'register'>
          Already have an account? <p className='link' onClick = {() => history.push('/login')} >Login!</p>
          </p>
      </div>
    </div>
  )
}
