import './CardStax.css';
import React, { useEffect, useState } from 'react'
import { Alert, Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import Card from './Card/Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Note {
    id: number; 
    title: string;
    message: string;
    date: string

    constructor(id: number,  title: string, message: string, date: string) {
        this.id = id; 
        this.title = title;
        this.message = message;
        this.date = date;
    }
}

export default function CardStax(props) {

    let date = new Date();
    
    let tempNote = new Note(-1,"","","")

    const [notes, setNotes] = useState([tempNote]); 
    const [show, setShow] = useState(false);
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [err, setError] = useState("");


    useEffect(() =>{
        loadUserNotes();
    },[]);


    function loadUserNotes(){
        fetch('/getNotes', {
            method: 'get',
        }).then(function (response){
            return response.json();
        }).then(function (data){
            setNotes([tempNote]);
            let tempNotes : Note[];
            tempNotes = [];
            data.notes.forEach((note)=>{
                let newNote = new Note(note.id, note.title, note.body, note.date);
                console.log(note.id);
                tempNotes.push(newNote);
           });
           setNotes(tempNotes);
        });

        

    }


    function validInput(){
        if (title.length===0 ){
            setError("Enter a title");
            return false ;
        }
        else if (body.length === 0 ){
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
            let note = new Note(-1, title, body, date.toUTCString());
            setNotes([...notes,note]);

            fetch('/saveNote', {
                method : 'post', 
                body: JSON.stringify({'title': title, 'body':body})
            }).then(function(response){
                return response.json();
            }).then(function (data){
                console.log(data);
            });
        }
        //Reset vars 
        setBody("");
        setTitle("")
        setShow(false);
        setError("");
    }


    function deleteNote(index){

        let tempNotes = [...notes];

        let delNote = tempNotes[index]; 

        fetch('/deleteNote', {
            method : 'post',
            body : JSON.stringify({'id': delNote.id})
        }).then (function (response){
            return response.json();
        }).then (function (data){
            if (data.res === "OKAY"){
                tempNotes.splice(index, 1);
                setNotes(tempNotes);
            }
        });

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
                        <FormControl rows={10} as='textarea' onChange={e=>setBody(e.target.value)} aria-label='Note'></FormControl>
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

