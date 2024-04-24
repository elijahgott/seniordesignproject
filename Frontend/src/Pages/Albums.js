import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import MyNav from "../MyComponents/MyNav";

function Albums( {currentUser} ){
    const currentDate = new Date();
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/albums')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])

//for rating modal
const [showRating, setShowRating] = useState(false);
const handleCloseRating = () => setShowRating(false);
const handleShowRating = () => setShowRating(true);

//values sent to database
var uid;
    if(! currentUser){
        uid = null;
    }
    else{
        uid = currentUser.uid;
    }
const [album, setAlbum] = useState('');
const [artist, setArtist] = useState('');
const dateAdded = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
const [rating, setRating] = useState('');

console.log("album: " + album);
console.log("artist: " + artist);

//handle starting rating - pass album and artist data from data.map
const handleStartRating = (albumPar, artistPar) => {
    handleShowRating();
    setAlbum(albumPar);
    setArtist(artistPar);
}

//handle rating change
const handleRatingChange = (e) => {
    let newRating = e.target.value;
    // Ensure the entered value is within the range 1-10
    if (newRating === '' || (parseInt(newRating) >= 1 && parseInt(newRating) <= 10)) {
    setRating(newRating);
    }
};

//handle submission of album and rating to listened list
const handleSubmitRating = (event) => {
    event.preventDefault();

      fetch('http://localhost:8081/submitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, album, artist, dateAdded, rating }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleCloseRating();
            alert('Successfully Rated Album');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Rating Album')
          });
  }; 

    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginTop: 5}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>Top Albums (Still need to get top 3 from database)</h1>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <Col>
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Img variant="top" src={require('./../MusicImages/TaylorSwift_1989(Taylor\'s_Version).jpg')}></Card.Img>
                                    <Card.Link href="#cardlink">1989 (Taylor's Version)</Card.Link>
                                    <Card.Title>Taylor Swift</Card.Title>
                                    <Card.Subtitle>#1 Album</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Img style={{ justifyContent: "center", display: "flex"}}variant="top" src={require('./../MusicImages/Sampha_Lahai.jpg')}></Card.Img>
                                    <Card.Link href="#cardlink">Lahai</Card.Link>
                                    <Card.Title>Sampha</Card.Title>
                                    <Card.Subtitle>#2 Album</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Img variant="top" src={require('./../MusicImages/KidsSeeGhosts_KidsSeeGhosts.jpg')}></Card.Img>
                                    <Card.Link href="#cardlink">Kids See Ghosts</Card.Link>
                                    <Card.Title>Kids See Ghosts</Card.Title>
                                    <Card.Subtitle>#3 Album</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                    
                <Container style={{marginTop: 20}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>All Albums <Link to="/AddAlbum"><Button><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h1>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Modal show={showRating} onHide={handleCloseRating} backdrop="static">
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Rate Album</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Form.Label style={{fontWeight: "bold"}}>Album Rating:</Form.Label>
                                            <Form.Control type="number" min={1} max={10} value={rating} onChange={handleRatingChange}></Form.Control>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseRating}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmitRating}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                        </Form>
                    </Modal>
                    <Row style={{marginLeft: 0, marginTop: 10, maxWidth:"81rem"}}>
                    {data.map((d, i) => (    
                                    <Card className="shadow" style={{maxWidth:"26rem", marginRight: 16, marginBottom: 10}}>
                                        <Card.Body>
                                            <Card.Img variant="top" src={require(`./../MusicImages/${d.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                            <Card.Link>{d.name}</Card.Link>
                                            <Card.Title>{d.artist}</Card.Title>
                                            <Card.Text style={{fontSize: 20}}>{d.description}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                <Button onClick={() => handleStartRating(d.name, d.artist)}>Rate Album</Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                    ))}
                    
                    </Row>
                </Container>
            </header>
    </div>
    )
}

export default Albums;