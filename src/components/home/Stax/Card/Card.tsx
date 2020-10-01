import './Card.css';
import React, { useState } from 'react'; 
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';







export default function Card(props){
 
    const [show, setShow] = useState(false);

    function handleClose(del){
        if (del){
            props.onDelete();
        }
        setShow(false);
    } 


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
                        onClick= {()=>setShow(true)} >
                    </img>
                </div>

            <div className = 'stax-card-body'>
                {txt}
            </div>
            <div className = 'stax-card-footer'>
                {date}
            </div>
            
            {/* Confirm Delete Dialog */}
            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete this Note!</Modal.Body>
                <Modal.Footer>
                    <Button variant= 'danger' onClick={() => handleClose(true)}> 
                        Delete
                    </Button>
                    <Button variant = 'primary'onClick = {() => handleClose(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            
            </Modal>
        </div>
    );
}