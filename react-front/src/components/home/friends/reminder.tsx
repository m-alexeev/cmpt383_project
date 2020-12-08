import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'
import {Button} from 'react-bootstrap'
import './reminder.css'




export default function Tracker() {

   const hist = useHistory();
   const [user,setUser] = useState(""); 
   const [emVals, setEmVals] = useState([0,0,0,0,0,0,0,0,0,0]);

   const emotions = [process.env.PUBLIC_URL + "/icons/anger.svg",process.env.PUBLIC_URL + "/icons/surprise.svg",
                     process.env.PUBLIC_URL + "/icons/hapiness.svg",process.env.PUBLIC_URL + "/icons/sadness.svg",
                     process.env.PUBLIC_URL + "/icons/fear.svg",process.env.PUBLIC_URL + "/icons/disgust.svg"]




   useEffect(() => {
      fetch('/getUser').then(res => res.json()).then(data => {
         setUser(data.user);
         if (data.redirect != null) {
           hist.push('login');
         }
       });
   }, []);

   function getMood(index,value){
      let temparr = [...emVals];
      temparr[index] = parseInt(value)
      setEmVals(temparr)
   }


   function saveMood(){

      fetch('/saveMood', {
         method: 'post',
         body : JSON.stringify({"anger":emVals[0], "surprise":emVals[1],"hapiness":emVals[2], "sadness":emVals[3], "fear":emVals[4], "disgust":emVals[5]})
      }).then(res =>{
         res.json();
      }).then(data =>{
         console.log(data)
      });
   }


   const emotic = emotions.map((em, index) => <Emotion key = {index} img = {em} name = {em.split('/').splice(-1)[0].split('.')[0]} onChange = {(val) =>getMood(index,val)}></Emotion>);


   return(
      <div className="home-container">
         <NavBar user = {user}/>
         <div className = 'moods'>
            <div className = 'container-fluid d-flex'>
               <div className = 'row'>
                  {emotic}
               </div>
            </div>
            <Button onClick = {()=> saveMood()}>
               Save Mood
            </Button>
         </div>
         <div className = 'summary'>
            
         </div>
      </div>
   )
}

function Emotion(props){
   var icon = props.img;
   var name = props.name;

   function handleChange(value){
      props.onChange(value); 
   }

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
            <input 
               className = 'slider' 
               type = 'range' 
               defaultValue='0' 
               min = '0' 
               max = '10'
               onChange = {e => handleChange(e.target.value)} />
         </div>
      </div>
   )
}


