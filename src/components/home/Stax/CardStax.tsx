import './CardStax.css';
import React, { useEffect, useState } from 'react'
import { Alert, Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import Card from './Card/Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

export default function CardStax(props) {

    let date = new Date();
    let note1 = new Note("Note1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum venenatis neque. Nulla metus nulla, varius eu est eu, ornare congue nulla. Maecenas et quam commodo, suscipit libero ut, ultricies nisi. Integer lectus tellus, molestie eu commodo at, pellentesque nec justo.", date.toUTCString());
    let note2 = new Note("Note2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum venenatis neque. Nulla metus nulla, varius eu est eu, ornare congue nulla. Maecenas et quam commodo, suscipit libero ut, ultricies nisi. Integer lectus tellus, molestie eu commodo at, pellentesque nec justo.", date.toUTCString());
    let note3 = new Note("Note3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date.toUTCString()); 

    let user = props.user;

    const [notes, setNotes] = useState([note1,note2,note3]); 
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [err, setError] = useState("");


    useEffect(() =>{
        if (user.length > 0){
            loadUserNotes();
        }
    },[user]);


    function loadUserNotes(){

        fetch('/getNotes', {
            method: 'post',
            body: JSON.stringify({"user":user})
        }).then(function (response){
            return response.json();
        }).then(function (data){
            console.log(data);
        });
    }


    function validInput(){
        if (title.length===0 ){
            setError("Enter a title");
            return false ;
        }
        else if (text.length === 0 ){
            setError("Enter a Note");
            return false; 
        } 
        return true;
    }


    function handleClose(save){
        //Create Note
        if (save) {
            //Check if Input is valid 
            if (!validInput()){
                return;
            }

            let note = new Note(title, text, date.toUTCString());
            setNotes([...notes,note]);
        }
        //Reset vars 
        setText("");
        setTitle("")
        setShow(false);
        setError("");
    }

    function deleteNote(index){
        let tempNotes = [...notes];
        tempNotes.splice(index, 1);
        setNotes(tempNotes);
    }

    const items = notes.map((note,index)=><Card  key = {index} note = {note} onDelete= {()=>deleteNote(index)}/>);


    return (
        <div className='card-stax'>
            <Button onClick = {() =>setShow(true) } >Create Card</Button>
            
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


            <Modal  show = {show} onHide ={handleClose}  centered>
                <Modal.Header closeButton  > 
                    <Modal.Title >Create Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text id = 'inputGroup-sizing-default'>Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange= {e =>setTitle(e.target.value)}></FormControl>
                    </InputGroup>
                    <InputGroup className='mb-3' >
                        <FormControl rows={10} as='textarea' onChange={e=>setText(e.target.value)} aria-label='Note'></FormControl>
                    </InputGroup>
                </Modal.Body>
                {/*Show Warning*/}
                {err.length > 0  &&
                    <Alert variant='danger' dismissible onClick={()=>setError("")}>
                        {err}
                    </Alert>
                }
                <Modal.Footer>
                    <Button variant= 'primary' onClick ={()=>handleClose(true)}> 
                        Save
                    </Button>
                    <Button variant= 'secondary' onClick ={()=>handleClose(false)}>
                        Discard
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

