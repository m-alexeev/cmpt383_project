import './CardStax.css';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Card from './Card/Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Dialog } from 'react-bootstrap/lib/Modal';

class Note {
    title: string;
    message: string;
    date: string

    constructor(title: string, message: string, date: string) {
        this.title = title;
        this.message = message;
        this.date = date;
    }
}


export default function CardStax() {

    let date = new Date();
    let note1 = new Note("Note1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum venenatis neque. Nulla metus nulla, varius eu est eu, ornare congue nulla. Maecenas et quam commodo, suscipit libero ut, ultricies nisi. Integer lectus tellus, molestie eu commodo at, pellentesque nec justo.", date.toUTCString());
    let note2 = new Note("Note2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum venenatis neque. Nulla metus nulla, varius eu est eu, ornare congue nulla. Maecenas et quam commodo, suscipit libero ut, ultricies nisi. Integer lectus tellus, molestie eu commodo at, pellentesque nec justo.", date.toUTCString());
    let note3 = new Note("Note3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date.toUTCString()); 

    const  [notes, setNotes] = useState([note1,note2,note3]); 

    function deleteNote(index){
        let tempNotes = [...notes];
        tempNotes.splice(index, 1);
        setNotes(tempNotes);
    }


    const items = notes.map((note,index)=><Card  key = {index} note = {note} onDelete= {()=>deleteNote(index)}/>);


    return (
        <div className='card-stax'>
            <Button onClick = {() => setNotes( [...notes, note1]) } >Create Card</Button>
            <div className="container-fluid d-flex ">
                <ReactCSSTransitionGroup
                    className = 'row'
                    transitionAppearTimeout = {300}
                    transitionEnterTimeout = {300}
                    transitionLeaveTimeout = {300}
                    transitionName="example"
                    transitionAppear={true}
                    transitionEnter={true}
                    transitionLeave={true}
                >
                    {items}
                </ReactCSSTransitionGroup>
            </div>
        </div>
    )
}

