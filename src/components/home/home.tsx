import React from 'react';
import './home.css';
import { useEffect, useState } from 'react';

function HomePage() {

  const [currentTime, setCurrentTime] = useState(1);


  useEffect(()=> {
    fetch('/time').then(res=> res.json()).then(data=>{
      setCurrentTime(data.time);
    });
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
      </header>
    </div>
  )
}

export default HomePage; 