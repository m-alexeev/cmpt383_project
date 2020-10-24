import React, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'



export default function Friends (){

    const history = useHistory(); 
    const [curUser, setCuruser] = useState("");

    useEffect(() => {
        fetch('/getUser').then(res => res.json()).then(data => {
          setCuruser(data.user);
          if (data.redirect != null) {
            history.push('/login');
          }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);


    return (
       <div className='friends-container'>
           <NavBar user = {curUser}/>
            
       </div>
    )
    }
    