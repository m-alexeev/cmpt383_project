import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'

import './friends.css'

import logo from './pic.png';

class FriendObj {
   id: number;
   username: string;
   img: string;

   constructor(id: number, username: string, img: string) {
      this.id = id;
      this.username = username;
      this.img = img;
   }
}




export default function Friends() {

   const history = useHistory();
   const [curUser, setCuruser] = useState("");

   const [search, setSearch] = useState("");


   //TODO: Create user obj 
   let user1 = new FriendObj(0, "user1", "testIMG");
   let user2 = new FriendObj(1, "user2", "testIMG");
   let user3 = new FriendObj(2, "user3", "testIMG");

   let users = [user1, user2, user3];


   function deleteUser(index){
      users.splice(index, 1); 
      console.log("removed" + index); 
   }




   const friendsList = users.map((user,index) => <Friend key = {index} friend = {user} onDelete = {() => deleteUser(index)} />);

   useEffect(() => {
      if (curUser === "") {
         fetch('/getUser').then(res => res.json()).then(data => {
            setCuruser(data.user);
            if (data.redirect != null) {
               history.push('/login');
            }
         });
      }
      //TODO: Create search query 
      console.log(search);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [search]);


   return (
      <div className='main-container'>
         <NavBar user={curUser} />
         <div className='friends-container'>
            <div className='friends-list'>
               <p> Friends </p>
               {friendsList}
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



export function Friend(props) {

   const user = props.friend; 
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