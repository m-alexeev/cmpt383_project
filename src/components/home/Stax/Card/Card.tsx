import './Card.css';
import React from 'react'; 



export default function Card(props){
 
    let title = props.title;
    let txt = props.txt; 
    let date = props.date; 

    return(
        <div className='stax-card'>
                <div className = 'stax-card-title'>
                    {title}
                  
                </div>
                <div className = 'stax-card-delete'>
                    X
                </div>

            <div className = 'stax-card-body'>
                {txt}
            </div>
            <div className = 'stax-card-footer'>
                {date}
            </div>
        </div>
    );

}