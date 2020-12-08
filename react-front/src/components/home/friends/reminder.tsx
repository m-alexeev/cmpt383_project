import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'
import { Alert, Button, Container, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { DropdownButton, Row, Col } from 'react-bootstrap';

import './reminder.css'




export default function Tracker() {

   const hist = useHistory();
   const [user,setUser] = useState(""); 

   const emotions = [process.env.PUBLIC_URL + "/icons/angry.svg",process.env.PUBLIC_URL + "/icons/anxious.svg",
                     process.env.PUBLIC_URL + "/icons/dissapointed.svg", process.env.PUBLIC_URL + "/icons/evil.svg", 
                     process.env.PUBLIC_URL + "/icons/excited.svg", process.env.PUBLIC_URL + "/icons/happy.svg",
                     process.env.PUBLIC_URL + "/icons/sad.svg",process.env.PUBLIC_URL + "/icons/shy.svg",
                     process.env.PUBLIC_URL + "/icons/sick.svg",process.env.PUBLIC_URL + "/icons/unamused.svg"]


   console.log(emotions[0].split('/').splice(-1)[0].split('.')[0])
   const emotic = emotions.map((em, index) => <Emotion img = {em} name = {em.split('/').splice(-1)[0].split('.')[0]}></Emotion>);

   useEffect(() => {
      fetch('/getUser').then(res => res.json()).then(data => {
         setUser(data.user);
         if (data.redirect != null) {
           hist.push('login');
         }
       });
   }, []); 


   return(
      <div className="home-container">
         <NavBar user = {user}/>
         <div className = 'moods'>
            <div className = 'container-fluid d-flex'>
               <div className = 'row'>
                  {emotic}
               </div>
            </div>
            <Button>
               Save Mood
            </Button>
         </div>
      </div>
   )
}

function Emotion(prop){
   var icon = prop.img;
   var name = prop.name;
   return (
      <div className = 'em-cont'>
         <div className = 'emotion'>
            <img 
               src = {icon}
               width = "50"
               height = "50"
               className = 'mood-icon'
               alt = "mood icon"/>
            <p>{name}</p>

         </div>
         <div className = 'scale'>
            <input className = 'slider' type = 'range' defaultValue='0' min = '0' max = '10'/>
         </div>
      </div>
   )
}


