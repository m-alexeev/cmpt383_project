import React from 'react';
import "./profile.css"
import NavBar from "../Navbar/navbar";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Profile() {

  const hist = useHistory();

  const [curUser, setCurUser] = useState("")
  const [email, setEmail] = useState(""); 
  const [pwd, setPwd] = useState(""); 
  const [reminder, setReminder] = useState(false); 



  useEffect(() => {
    fetch('/getUser').then(res => res.json()).then(data => {
      setCurUser(data.user);
      if (data.redirect != null) {
        hist.push('login');
      }
    })
  }, []);

  // !Change placeholders 

  function verifyForm(){

  }



  return (
    <div className='home-container'>
      <NavBar user={curUser} />
      <div className='settings'>
        <div className='header'>
          Settings
        </div>
        <Form>
          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control type='email' placeholder="Change Email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPass">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control type='password' placeholder="Change Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as='legend' column sm={3}>
                Reminders
              </Form.Label>
              <Col sm={3}>
                <Form.Check
                  type='radio'
                  label='On'
                  name='reminder'
                  id='reminderOn'
                  checked = {reminder ? true: false}
                  onClick = {() => {setReminder(!reminder)}}
                />
                <Form.Check
                  type='radio'
                  label='Off'
                  name='reminder'
                  id='reminderOff'
                  checked = {reminder ? false : true}
                  onClick = {() => {setReminder(!reminder)}}
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
    </div>
  );
}