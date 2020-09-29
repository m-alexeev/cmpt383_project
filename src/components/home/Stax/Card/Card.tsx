import './Card.css';
import React from 'react'; 



export default function Card(props){
 

    let title = props.note.title;
    let txt = props.note.message; 
    let date = props.note.date; 


    return(
        <div className='stax-card'>
                <div className = 'stax-card-title'>
                    {title}
                </div>
                <div className = 'stax-card-delete'>
                    <img  
                        src = {process.env.PUBLIC_URL+ '/delete.svg'}
                        alt = "Delete Icon"
                        onClick = {props.onDelete}></img>
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