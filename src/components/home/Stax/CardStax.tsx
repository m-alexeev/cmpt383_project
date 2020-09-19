import './CardStax.css';
import React, { useState } from 'react'
import {Button} from 'react-bootstrap';



export default function CardStax(){

    const [cards , setCards ] = useState([]); 


    return (
        <div className = 'layout'>
            <div className = 'create-card'>
                 <Button>Create Card</Button>
            </div>

        </div>
    )
}