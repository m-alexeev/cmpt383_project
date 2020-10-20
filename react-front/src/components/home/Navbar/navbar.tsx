import React from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export default function NavBar(props){
    const user = props.user;
    const history=  useHistory(); 

    function signOut(){
        fetch('/signout').then((res) => res.json()).then(
            () => {
                history.push('/login');
            }
        )
    }

    function handleSelect(eventKey){
        history.push(eventKey);
    }

    return (
        <Navbar bg ='dark' variant = 'dark' >
            <Navbar.Brand href = ''>
                <img
                    src = {process.env.PUBLIC_URL+ '/stax_logo.svg'}
                    width = '40'
                    height = '40'
                    className = 'd-inline-block align-center'
                    alt = 'stax log'
                />{' '}
                    Stax</Navbar.Brand>
            <Navbar.Toggle/>
            <Nav className = 'mr-auto' onSelect = {handleSelect}>
                <Nav.Link href='/' eventKey = '/' >Home</Nav.Link>
                <Nav.Link href='/friends' eventKey = '/friends' >Friends</Nav.Link>
                <Nav.Link eventKey = '/profile' >Profile</Nav.Link>
            </Nav>

            <Navbar.Collapse className = 'justify-content-end'>
                <Navbar.Text>
                    {user}
                </Navbar.Text>

                <Button onClick = {e => signOut()} style={{margin: '10px'} } variant = 'outline-info'>Logout</Button>
            </Navbar.Collapse>
            
        </Navbar>
    );
}