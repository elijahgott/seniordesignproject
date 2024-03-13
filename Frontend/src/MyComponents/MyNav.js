import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';



function MyNav(){
    return(
        <Navbar expand = "lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
                <Navbar.Brand href="/" style={{fontWeight: 'bold', color: "lightgray"}}>Music App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/new">New</Link></Nav.Link>
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/artists">Artists</Link></Nav.Link>
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/albums">Albums</Link></Nav.Link>
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/about">About</Link></Nav.Link>
              
                    <NavDropdown title="Profile" >
                      <NavDropdown.Item><Link to="/profile">My Profile</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/lists">My Lists</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/friends">Friends</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/settings">Settings</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/signin">Sign In</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/signout">Sign Out</Link></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="primary"><Image src={require('./../MiscImages/search-icon-sm.png')} className="searchButton"></Image></Button>
                </Form>
              </Navbar.Collapse>
          </Container>
          <Outlet />
        </Navbar>
        
    )
}

export default MyNav;