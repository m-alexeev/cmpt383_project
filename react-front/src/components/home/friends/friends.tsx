import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'

import './friends.css'


class FriendObj{
   id: number;
   username: string; 
   img: string;

   constructor(id:number, username:string, img:string){
      this.id = id;
      this.username = username; 
      this.img = img; 
   }
}




export default function Friends() {

   const history = useHistory();
   const [curUser, setCuruser] = useState("");
   const [friends, setFriends] = useState([])

   const [search, setSearch] = useState("");


   //TODO: Create user obj 

   useEffect(() => {
      fetch('/getUser').then(res => res.json()).then(data => {
         setCuruser(data.user);
         if (data.redirect != null) {
            history.push('/login');
         }
      });
      //TODO: Create search query 
      console.log(search);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [search]);


   return (
      <div className='main-container'>
         <NavBar user={curUser} />
         <div className='friends-container'>
            <div className='friends-list'>
               List
                </div>
            <div className='friends-search'>
               <div className='search-form'>
                  <Form>
                     <Form.Group>
                        <Form.Control
                           type='text'
                           placeholder='Enter Username'
                           onChange={e => setSearch(e.target.value)}>
                        </Form.Control>
                     </Form.Group>
                  </Form>
               </div>
            </div>
         </div>
      </div>
   )
}



export function Friend(props){

   const username = props.username; 
   const id = props.id;
   const img = props.img;
 
   return (
      <div className = "box">
         <div className = 'pic'>
            <img src={img}></img>
         </div>
         <div className = 'username'>
            {username}
         </div>
         <div className = 'add-button'>
            +
         </div>
      </div>
   )
}