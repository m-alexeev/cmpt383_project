import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'

import './reminder.css'

import logo from './pic.png';



export default function Reminder() {

   const hist = useHistory();

   const [user,setUser] = useState(""); 

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
         <div className = 'reminders'>
            
         </div>
      </div>
   )
}



export function Friend(props) {

   const user = props.friend; 
   const username = props.username;
   // const id = props.id;
   // const img = props.img;

   function handleDelete(){
      props.onDelete(); 
   }


   return (
      <div className="box">
         <div className='pic'>
            <img src={logo} alt='user image'></img>
         </div>
         <div className='username'>
            {user.username}
         </div>
         <div className='remove'>
            <img
               src={process.env.PUBLIC_URL + '/delete.svg'}
               alt="Delete Icon"
               onClick = {() => handleDelete()}>
            </img>
         </div>
      </div>
   )
}