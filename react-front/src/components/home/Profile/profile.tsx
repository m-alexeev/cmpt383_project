import React from 'react';
import "./profile.css"
import NavBar from "../Navbar/navbar";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export default function Profile() {

  const hist = useHistory();

  const [curUser, setCurUser] = useState("")
  const [email, setEmail] = useState(""); 
  const [pwd, setPwd] = useState(""); 
  const [reminder, setReminder] = useState(false); 
  const [emailErr, setEmailError] = useState(""); 
  const [pwdErr, setPwdErr] = useState(""); 

  const [confirm, setConfirm] = useState(false);
  
  useEffect(() => {
    fetch('/getUser').then(res => res.json()).then(data => {
      setCurUser(data.user);
      if (data.redirect != null) {
        hist.push('login');
      }
    })
  }, []);

  // !Change placeholders 



  function validateEmail(){ 
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailError("");
      return true;
    }else{
      setEmailError("Email is Invalid");
      return false;
    }
  }

  function validatePwd(){
    if (pwd.length < 8) {
      setPwdErr("Password must be longer than 8 characters");
      return false;
    }else{
      setPwdErr(""); 
      return true; 
    } 
  }

  function verifyForm(){
    console.log("reminder: " + reminder); 
    console.log("email: " + email); 
    console.log("pwd: " +  pwd); 
    
    var entries = {}

    if (email.length > 0){
      if(validateEmail()){
        entries["email"] = email;
      }
    }
    if (pwd.length > 0 ){
      if (validatePwd()){
        entries['pwd'] = pwd;
      }
    }

    entries['rem'] = reminder; 

    fetch("/updateUser", {
      method: "post",
      body: JSON.stringify(entries)
    }).then(function (response){
      return response.json();
    }).then(function (data){
      console.log(data); 
      setConfirm(true);
      setCurUser(data.email);
    });
  }



  return (
    <div className='home-container'>
      <NavBar user={curUser} />
      <div className='settings'>
        <div className='header'>
          Settings
        </div>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>
              Email:
            </Form.Label>
              <Form.Control 
              type='email' 
              placeholder="Change Email"
              onChange =  {e => setEmail(e.target.value)}
              isInvalid = {!!emailErr}
               />
              <Form.Control.Feedback type = 'invalid'>
                {emailErr}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPass">
            <Form.Label >
              Password:
            </Form.Label>
              <Form.Control 
              type='password' 
              placeholder="Change Password"
              onChange = {e => setPwd(e.target.value)}
              isInvalid = {!!pwdErr} />
              <Form.Control.Feedback type = 'invalid'>
                {pwdErr}
              </Form.Control.Feedback>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as='legend' column sm={3}>
                Reminders:
              </Form.Label>
              <Col sm={3}>
                <Form.Check
                  type='radio'
                  label='On'
                  name='reminder'
                  id='reminderOn'
                  checked = {reminder ? true: false}
                  onChange = {() => {setReminder(!reminder)}}
                />
                <Form.Check
                  type='radio'
                  label='Off'
                  name='reminder'
                  id='reminderOff'
                  checked = {reminder ? false : true}
                  onChange = {() => {setReminder(!reminder)}}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row}>
          </Form.Group>
        </Form>
        <div className="saveBtn">
          <Button onClick = {verifyForm}>
            Save
          </Button>
        </div>
      </div>

      <Modal show = {confirm} onHide = {() => setConfirm(false)} size = 'sm' centered>
        <Modal.Header closeButton>
          Confirmation
        </Modal.Header>
        <Modal.Body>
          Your settings have been saved!
        </Modal.Body>
        <div className = "closeBtn">
        <Button onClick = {() => setConfirm(false)}>
          Close
        </Button>
        </div>
      </Modal>
      


    </div>
  );
}