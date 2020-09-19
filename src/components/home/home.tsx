import React from 'react';
import './home.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './Navbar/navbar';
import CardStax from './Stax/CardStax';

export default function HomePage() {

  const history = useHistory();


  const [curUser, setCurUser] = useState("");

  useEffect(() => {
    fetch('/getUser').then(res => res.json()).then(data => {
      setCurUser(data.user);
      if (data.redirect != null) {
        history.push('/login');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      <NavBar user={curUser} />
      <CardStax/>
    </div>
  )
}