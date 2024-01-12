import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    <div className="App">
      <Navbar expand = "lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">LeBron James Dislike Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link style={{ color: 'white'}} href="#link1">Link1</Nav.Link>
                <Nav.Link style={{ color: 'yellow'}} href="#link2" className="">Link2</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <header className="App-header">
        <Card style={{ width: '25rem'}}>
          <Card.Body>
            <Card.Img style={{ height: 200 }}variant="top" src="https://i.redd.it/pve0tjjdhvu61.jpg"></Card.Img>
            <Card.Title>Bing Chilling</Card.Title>
            <Card.Subtitle></Card.Subtitle>
            <Card.Text>Zǎo shang hǎo zhōng guó!</Card.Text>
            <Card.Link href="#cardlink">CCP Website</Card.Link>
          </Card.Body>
        </Card>

        <Image src="https://www.fanduel.com/fantasy/_next/image?url=https%3A%2F%2Fd17odppiik753x.cloudfront.net%2Fplayerimages%2Fnba%2F9488.png&w=256&q=75" roundedCircle />
        <br></br>
        <p>LeBum James</p>
        <p>May Allah have mercy upon his soul.</p>
        <Button variant="danger">Kill Him</Button>
        <p>Bronny shall be next. Not the other son tho he's hella chill.</p>
      </header>
      
      <p>Kinda like a footer if outside of header</p>
    </div>
  );
}

export default App;