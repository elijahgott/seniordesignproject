import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';


function MyNav(){
    return(
        <Navbar expand = "lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/" style={{fontWeight: 'bold'}}>Music App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link style={{ color: 'yellow'}}><Link to="/artists">Artists</Link></Nav.Link>
                <Nav.Link style={{ color: 'yellow'}}><Link to="/albums">Albums</Link></Nav.Link>
                <Nav.Link style={{ color: 'yellow'}}><Link to="/about">About</Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Outlet />
        </Navbar>
        
    )
}

export default MyNav;