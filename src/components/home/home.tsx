import React from 'react';
import './home.css';
import { useEffect, useState } from 'react';

export default function HomePage() {

  const [currentTime, setCurrentTime] = useState(1);
  const [curUser, setCurUser] = useState("");

  useEffect(()=> {
    fetch('/time').then(res=> res.json()).then(data=>{
      setCurrentTime(data.time);
    });
    fetch('/getUser').then(res => res.json()).then(data =>{
      setCurUser(data.user);
    })

  }, [])

  return (
    <div className="Home">
      <header className="App-header">
        <p>
          Welcome to the Home Page! 
        </p>
        <p>
          The current time is {currentTime}
        </p>
        <p>
          The curent user is {curUser}
        </p>
      </header>
    </div>
  )
}