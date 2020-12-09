import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Navbar/navbar'
import { Button } from 'react-bootstrap'
import './reminder.css'

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_frozen from '@amcharts/amcharts4/themes/frozen';

am4core.useTheme(am4themes_frozen);
am4core.useTheme(am4themes_animated);

export default function Tracker() {

   const hist = useHistory();
   const [user, setUser] = useState("");
   const [emVals, setEmVals] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
   const [userVal, setUserVal] = useState({"anger":0 ,"surprise": 0, "hapiness":0, "sadness":0, "fear":0,"disgust":0});
   const chart = useRef(am4charts.XYChart);

   const emotions = [process.env.PUBLIC_URL + "/icons/anger.svg", process.env.PUBLIC_URL + "/icons/surprise.svg",
   process.env.PUBLIC_URL + "/icons/hapiness.svg", process.env.PUBLIC_URL + "/icons/sadness.svg",
   process.env.PUBLIC_URL + "/icons/fear.svg", process.env.PUBLIC_URL + "/icons/disgust.svg"]

   useEffect(() => {
      fetch('/getUser').then(res => res.json()).then(data => {
         setUser(data.user);
         if (data.redirect != null) {
            hist.push('login');
         }
      });

      updateMoods();
   }, []);

   useEffect(() => {
      let x = am4core.create("chartdiv", am4charts.XYChart);

      x.paddingRight = 0;
      console.log(userVal)
      // Add data
      for (var key in userVal){
         x.data.push({"mood": key,
                     "score": userVal[key]})
      }
      //* Code taken from amcharts documentation and altered to fit desired scenario
      // Create axes
      var categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "mood";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

  
      var valueAxis = x.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = x.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "score";
      series.dataFields.categoryX = "mood";
      series.name = "score";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;
      
      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;



   }, [userVal]);

   function updateMoods(){
      fetch('/getMoods').then(res => {
         return res.json()
      }).then(data =>{
         let arr = data['moods'];
         var dict = userVal;
         arr.forEach(element => {
            for (var key in element){
               dict[key] = element[key]
            }
         });
         setUserVal(dict)
      });
   }

   

   function getMood(index, value) {
      let temparr = [...emVals];
      temparr[index] = parseInt(value)
      setEmVals(temparr)
   }

   function saveMood() {

      fetch('/saveMood', {
         method: 'post',
         body: JSON.stringify({ "anger": emVals[0], "surprise": emVals[1], "hapiness": emVals[2], "sadness": emVals[3], "fear": emVals[4], "disgust": emVals[5] })
      }).then(res => {
         return res.json()
      }).then(data => {
      });

      updateMoods();
   }

   const emotic = emotions.map((em, index) => <Emotion key={index} img={em} name={em.split('/').splice(-1)[0].split('.')[0]} onChange={(val) => getMood(index, val)}></Emotion>);


   // Chats


   return (
      <div className="home-container">
         <NavBar user={user} />
         <div className='moods'>
            <div className='container-fluid d-flex'>
               <div className='row'>
                  {emotic}
               </div>
            </div>
            <Button onClick={() => saveMood()}>
               Save Mood
            </Button>
         </div>
         <div className= 'chart'>
            <div className='chartdiv' style={{ width: "80%", height: "500px" }}/>
         </div>
      </div>
   )
}

function Emotion(props) {
   var icon = props.img;
   var name = props.name;

   function handleChange(value) {
      props.onChange(value);
   }

   return (
      <div className='em-cont'>
         <div className='emotion'>
            <img
               src={icon}
               width="50"
               height="50"
               className='mood-icon'
               alt="mood icon" />
            <p>{name}</p>

         </div>
         <div className='scale'>
            <input
               className='slider'
               type='range'
               defaultValue='0'
               min='0'
               max='10'
               onChange={e => handleChange(e.target.value)} />
         </div>
      </div>
   )
}


