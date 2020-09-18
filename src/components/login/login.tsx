import './login.css';
import React, { useState } from 'react';
import {Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {  useHistory } from 'react-router-dom';


export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");


  let history = useHistory(); 


  async function handleSubmit(e) {
    e.stopPropagation();
    if (validate()) {
      e.preventDefault();
      let data = await fetch_request();
  
      console.log(await data);
      if (await data['user'] != null){
        history.push('/');
      }
      if (await data['err'] != null){
        setError(data['err']);
      }
    }
  }



  async function fetch_request() {
    let data = await fetch('/login', {
      method: 'post',
      body: JSON.stringify({ "email": email, "password": password })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      return data;
    }).catch(error => console.warn(error));

    return data;
  }



  function validate() {
    let isValid = true;

    if (password.length === 0) {
      isValid = false;
    }
    if (email.length === 0) {
      isValid = false;
    }
    return isValid;
  }


  return (
    <div className="Login">
      <div className="LoginBox">
        <Form method='post'>
          <h2>
            Please Login!
          </h2>
          <FormGroup controlId="email" >
            <FormControl
              placeholder="Email"
              autoFocus
              name='email'
              type='email'
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormControl
              placeholder="Password"
              name='password'
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            >
            </FormControl>
          </FormGroup>
          <p className='error'>{err}</p>
        </Form>
        <Button block onClick={e => handleSubmit(e)} type='submit'>
          Login
          </Button>
        <p className = 'register'>
          Don't have an account? <a onClick = {() => history.push('/register')} >Register!</a>
          </p>
      </div>
    </div>
  )
}
