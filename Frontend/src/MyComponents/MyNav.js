import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';


function MyNav( {currentUser, handleSignOut} ){

  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8081/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem('search', JSON.stringify(data)); //saves search results to local storage
      navigate('/searchresults');
    }
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }; 

    return(
        <Navbar className="navbar" expand="lg" style={{paddingTop: 20, paddingBottom: 20}}>
          <Container>
                <Navbar.Brand style={{width: "auto", fontWeight: "bold"}}><Link to="/" className="navlink navbrand"><span role="img" aria-label="compact disc emoji">💿</span> Music Tracker</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/new" className="navlink">New</Link></Nav.Link>
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/artists" className="navlink">Artists</Link></Nav.Link>
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/albums" className="navlink">Albums</Link></Nav.Link>
                    <Nav.Link style={{ color: "lightgray"}}><Link to="/about" className="navlink">About</Link></Nav.Link>
              
                    <NavDropdown title="Profile" className="navlink">
                      {currentUser ? (
                        <>
                          <NavDropdown.Item><Link to="/profile" className="navlink">My Profile</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to="/lists" className="navlink">My Lists</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to="/friends" className="navlink">Friends</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to="/settings" className="navlink">Settings</Link></NavDropdown.Item>
                          <NavDropdown.Item onClick={handleSignOut} ><Link className="navlink">Sign Out</Link></NavDropdown.Item>
                        </>
                      ) : <>
                            <NavDropdown.Item><Link to="/signin" className="navlink">Sign In</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/signup" className="navlink">Sign Up</Link></NavDropdown.Item>
                          </>}
                    </NavDropdown>
                </Nav>
                
                <Form className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleSearch}><Image src={require('./../MiscImages/search-icon-sm.png')} className="searchButton"></Image></Button>
                </Form>
              </Navbar.Collapse>
          </Container>
          <Outlet />
        </Navbar>
        
    )
}

export default MyNav;