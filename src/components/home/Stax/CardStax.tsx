import './CardStax.css';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from './Card/Card';


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
    //   const [cards , setCards ] = useState([]); 

    const  [notes, setNotes] = useState([note1,note2,note3]); 



    return (
        <div className='card-stax'>
                <Button onClick = {() => setNotes( [...notes, note1]) } >Create Card</Button>
               
                <div className="container-fluid d-flex ">
                    <div className = 'row'>
                        {notes.map((note) =>{
                            return <Card title = {note.title} txt = {note.message} date = {note.date} />
                        })
                        }
                    </div>
                </div>
        </div>
    )
}




 /*{ <div className='row'>
                            {[
                                'Primary',
                                'Secondary',
                                'Success',
                                'Danger',
                                'Warning',
                                'Info',
                                'Light',
                                'Dark',
                            ].map((variant, idx) => (
                                <div className='col-md-2'>

                                <Card
                                    bg={variant.toLowerCase()}
                                    key={idx}
                                    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                                    style={{ width: '18rem' }}
                                    className="mb-2"
                                >
                                    <Card.Header>{variant} Header</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{variant} Card Title </Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </div>
                            ))
                            }
                        
                    </div> }*/