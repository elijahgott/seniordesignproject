import React from "react";
import { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";

function MyNav( {currentUser} ){

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
        <Navbar expand = "lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
                <Navbar.Brand style={{fontWeight: 'bold', color: "lightgray"}}><Link to="/">Music App</Link></Navbar.Brand>
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
                      {currentUser ? (
                        <NavDropdown.Item><Link to="/signout">Sign Out</Link></NavDropdown.Item>
                      ) : <NavDropdown.Item><Link to="/signin">Sign In</Link></NavDropdown.Item>}
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