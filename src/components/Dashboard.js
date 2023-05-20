import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Landing from './Landing';

function LandingNav() {
    const [login,setLogin]=useState(true);
  return (
    <div className='w-full h-screen d-flex flex-col justify-between'>
    <div className='w-full '>
    <Navbar variant='dark' bg='dark'>
      <Container fluid>
        <Navbar.Brand href="#home">BookHub</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button variant="success" onClick={()=>setLogin(prev=>!prev)}>
            {
                login?"Login":"Signup"
            }
        </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div className='w-full d-flex flex-col justify-center' style={{height:"90vh"}}>
            <div className='w-full'>
            <Landing show={login} />
            </div>
    </div>
    </div>
  );
}

export default LandingNav;