import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import MyNav from "../MyComponents/MyNav";
import MyFooter from "../MyComponents/MyFooter";

function Artists( {currentUser, onSignOut} ){
    useEffect(() => {
            document.title ="Music Tracker - Artists"
        }, []);

    const [artists, setArtists] = useState([])

    useEffect(()=>{
        fetch('/api/artists')
        .then(res => res.json())
        .then(data => setArtists(data))
        .catch(err => console.log(err));
  }, [])

    // FETCH TOP THREE ARTISTS
    // const [topThreeArtists, setTopThreeArtists] = useState([])

    // useEffect(()=>{
    //     fetch('/topthreeartists')
    //     .then(res => res.json())
    //     .then(topThreeArtists => setTopThreeArtists(topThreeArtists))
    //     .catch(err => console.log(err));
    // }, [])

    // RENDER TOP THREE ARTISTS

    // topThreeArtists.map((artists, i) => (    
    //                 <Card style={{maxWidth:"26rem"}}>
    //                     <Card.Body>
    //                         <Card.Img variant="top" src={require(`./../MusicImages/${artists.photo}`)} style={{maxWidth: 500}}></Card.Img>
    //                         <Card.Link>{artists.name}</Card.Link>
    //                         <Card.Subtitle>#{i+1} Artist</Card.Subtitle>
    //                         <Card.Subtitle style={{marginTop: 3}}>Average Rating: {artists.average_rating}</Card.Subtitle>
    //                         <Card.Text style={{fontSize: 20}}>{artists.bio}</Card.Text>
    //                     </Card.Body>
    //                 </Card>
    // ))

    // ADD ARTIST MODAL
    const [showModal, setShowModal] = useState(false)

    const handleOopenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const [artistName, setArtistName] = useState('')
    const [artistBio, setArtistBio] = useState('')
    const [artistPhotoUrl, setArtistPhotoUrl] = useState('')

    const handleSubmitArtist = (event) => {
        event.preventDefault()

        fetch('/api/artists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artistName, artistBio, artistPhotoUrl }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.Error);
            }
            return response.json();
          })
          .then(data => {
            setArtists(artists.concat(data))
            setArtistName('')
            setArtistBio('')
            setArtistPhotoUrl('')
            handleCloseModal()
            // Handle success message
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error message
          });
    }


    return(
        <div>
            <MyNav currentUser={currentUser} onSignOut={onSignOut} />
            <header className="App-header">
            <Container className="containerCard shadow">
                    <Row>
                        <Col>
                            <Card className="no-border" style={{maxWidth:"81rem"}}>
                                <h1 className="title">Top Artists</h1>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="cardRow">
                        <Card style={{maxWidth:"26rem"}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require(`./../MusicImages/aliceinchains.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                <Card.Link>Alice in Chains</Card.Link>
                                <Card.Subtitle>#1 Artist</Card.Subtitle>
                                <Card.Subtitle style={{marginTop: 3}}>Average Rating: 100</Card.Subtitle>
                                <Card.Text style={{fontSize: 20}}>Alice in Chains is an American rock band formed in Seattle in 1987.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{maxWidth:"26rem"}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require(`./../MusicImages/nirvana.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                <Card.Link>Nirvana</Card.Link>
                                <Card.Subtitle>#2 Artist</Card.Subtitle>
                                <Card.Subtitle style={{marginTop: 3}}>Average Rating: 95</Card.Subtitle>
                                <Card.Text style={{fontSize: 20}}>Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer and guitarist Kurt Cobain and bassist Krist Novoselic.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{maxWidth:"26rem"}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require(`./../MusicImages/dannybrown.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                <Card.Link>Danny Brown</Card.Link>
                                <Card.Subtitle>#3 Artist</Card.Subtitle>
                                <Card.Subtitle style={{marginTop: 3}}>Average Rating: 90</Card.Subtitle>
                                <Card.Text style={{fontSize: 20}}>Daniel Dewan Sewell, better known as Danny Brown, is an American rapper, singer and songwriter from Detroit, Michigan.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>

                    <Row style={{marginTop: 30}}>
                        <Col>
                        {currentUser ? (
                            <Card className="headerCard" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>All Artists <Button onClick={handleOopenModal} style={{marginBottom: 7}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                            </Card>
                        ) : 
                            <Card className="headerCard" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>All Artists <Button disabled style={{marginBottom: 7}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                            </Card>
                        }
                            
                        </Col>
                    </Row>
                    
                    {artists.length > 0 ?
                    (
                        <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem", marginBottom: 16}}>
                            {artists.map((artist, i) => (    
                                <Card key={i} className="shadow" style={{maxWidth:"26rem"}} border="none">
                                    <Card.Body>
                                        <Card.Img variant="top" src={artist.photoURL} style={{width: 358, height: 358}}></Card.Img>
                                        <Card.Link>{artist.name}</Card.Link>
                                        <Card.Text style={{fontSize: 20}}>{artist.bio}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Row>
                    )
                    :
                    (
                        <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem"}}>
                            <p className="smallText notLoaded">Nothing to see here...</p>
                        </Row>
                    )
                    }
                    
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Artist</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="textarea" name="artist_name" value={artistName} onChange={(e) => setArtistName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <Form.Label>Bio</Form.Label>
                                            <Form.Control type="textarea" rows={3} name="artist_bio" value={artistBio} onChange={(e) => setArtistBio(e.target.value)}></Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <Form.Label>Photo URL</Form.Label>
                                            <Form.Control type="textarea" name="artist_photo_url" value={artistPhotoUrl} onChange={(e) => setArtistPhotoUrl(e.target.value)}></Form.Control>
                                        </Form.Group>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmitArtist}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                        </Form>
                    </Modal>

            </header>
            <MyFooter />
        </div>
    )
}

export default Artists;