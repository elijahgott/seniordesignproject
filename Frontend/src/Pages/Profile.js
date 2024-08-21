import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import MyNav from "../MyComponents/MyNav";

/* app crashes when user not signed in and tries to access profile page */

function Profile({currentUser}){
    var uid;
    if(! currentUser){
        uid = null;
    }
    else{
        uid = currentUser.uid;
    }

    //fetch all albums from database
    const [albums, setAlbums] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/albums')
        .then(res => res.json())
        .then(albums => setAlbums(albums))
        .catch(err => console.log(err));
  }, [])

  //fetch all artists from database
  const [artists, setArtists] = useState([])

  useEffect(()=>{
      fetch('http://localhost:8081/artists')
      .then(res => res.json())
      .then(artists => setArtists(artists))
      .catch(err => console.log(err));
}, [])

    //fetch data from current user profile
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        async function fetchProfile() {
        try {
            const response = await fetch(`http://localhost:8081/users/${uid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProfile(data);
        } 
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        }

        fetchProfile();
    }, []);

        //fetch top 5 artists list from current user
        const [userArtistList, setUserArtistList] = useState([]);

        useEffect(() => {
            async function fetchUserArtistList() {
            try {
                const response = await fetch(`http://localhost:8081/userlistartist/${uid}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserArtistList(data);
            } 
            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            }
    
            fetchUserArtistList();
        }, []);

        //fetch top 5 albums list from current user
        const [userAlbumList, setUserAlbumList] = useState([]);

        useEffect(() => {
            async function fetchUserAlbumList() {
            try {
                const response = await fetch(`http://localhost:8081/userlistalbum/${uid}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserAlbumList(data);
            } 
            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            }
    
            fetchUserAlbumList();
        }, []);

    //ADD TO TOP 5 ARTISTS LIST
    // for top 5 artists modal
    const [showArtists, setShowArtists] = useState(false);
    const handleCloseArtists = () => setShowArtists(false);
    const handleShowArtists = () => setShowArtists(true);

    //let position = '';
    const [artistPosition, setArtistPosition] = useState('');
    const [artistSelection, setArtistSelection] = useState('');

    //handle submission of album to listened list
    const handleSubmitArtists = (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8081/submittopfiveartists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, artistPosition, artistSelection }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleCloseArtists();
            alert('Successfully Added Artist to Top 5 List');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Artist to Top 5 List')
          });
      }; 

        //handles selection of album from dropdown list
        const handleArtistSelectionChange = (e) => {
            setArtistSelection(e.target.value);
        };

        //handle rating change
        const handleArtistPositionChange = (e) => {
            let newPosition = e.target.value;
            // Ensure the entered value is within the range 1-10
            if (newPosition === '' || (parseInt(newPosition) >= 1 && parseInt(newPosition) <= 5)) {
            setArtistPosition(newPosition);
            }
        };

    // UPDATING ARTIST LIST
    // for update top 5 artists modal
    const [showUpdateArtists, setShowUpdateArtists] = useState(false);
    const handleCloseUpdateArtists = () => setShowUpdateArtists(false);
    const handleShowUpdateArtists = () => setShowUpdateArtists(true);

    //let position = '';
    const [artistUpdatePosition, setArtistUpdatePosition] = useState('');
    const [artistUpdateSelection, setArtistUpdateSelection] = useState('');

    //handle submission of artist to listened list
    const handleSubmitUpdateArtists = (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8081/updatetopfiveartists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, artistUpdatePosition, artistUpdateSelection }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleCloseUpdateArtists();
            alert('Successfully Added Artist to Top 5 List');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Artist to Top 5 List')
          });
      }; 

        //handles selection of artist from dropdown list
        const handleArtistUpdateSelectionChange = (e) => {
            setArtistUpdateSelection(e.target.value);
        };

        //handles artist position change
        const handleArtistUpdatePositionChange = (e) => {
            let newPosition = e.target.value;
            // Ensure the entered value is within the range 1-10
            if (newPosition === '' || (parseInt(newPosition) >= 1 && parseInt(newPosition) <= 5)) {
            setArtistUpdatePosition(newPosition);
            }
        };


    //ADDING TO TOP 5 ALBUMS LIST
    // for top 5 albums modal
    const [showAlbums, setShowAlbums] = useState(false);
    const handleCloseAlbums = () => setShowAlbums(false);
    const handleShowAlbums = () => setShowAlbums(true);

    const [albumPosition, setAlbumPosition] = useState('');
    const [albumSelection, setAlbumSelection] = useState('');

    //handle submission of album to listened list
    const handleSubmitAlbums = (event) => {
        event.preventDefault();
        console.log(albumSelection);
        let temp = albumSelection.split('-');
        const album = temp[0];
        const artist = temp[1];
    
        fetch('http://localhost:8081/submittopfivealbums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, albumPosition, album, artist }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleCloseAlbums();
            alert('Successfully Added Album to Top 5 List');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Album to Top 5 List')
          });
      }; 

        //handles selection of album from dropdown list
        const handleAlbumSelectionChange = (e) => {
            setAlbumSelection(e.target.value);
        };

        //handle rating change
        const handleAlbumPositionChange = (e) => {
            let newPosition = e.target.value;
            // Ensure the entered value is within the range 1-10
            if (newPosition === '' || (parseInt(newPosition) >= 1 && parseInt(newPosition) <= 5)) {
            setAlbumPosition(newPosition);
            }
        };

    //UPDATE ALBUMS LIST
    // for top 5 albums modal
    const [showUpdateAlbums, setShowUpdateAlbums] = useState(false);
    const handleCloseUpdateAlbums = () => setShowUpdateAlbums(false);
    const handleShowUpdateAlbums = () => setShowUpdateAlbums(true);

    const [albumUpdatePosition, setAlbumUpdatePosition] = useState('');
    const [albumUpdateSelection, setAlbumUpdateSelection] = useState('');

    //handle updating position on top 5 albums
    const handleUpdateAlbums = (event) => {
        event.preventDefault();
        let temp = albumUpdateSelection.split('-');
        const album = temp[0];
        const artist = temp[1];
    
        fetch('http://localhost:8081/updatetopfivealbums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, albumUpdatePosition, album, artist }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleCloseUpdateAlbums();
            alert('Successfully Added Album to Top 5 List');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Album to Top 5 List')
          });
      }; 

        //handles selection of album from dropdown list
        const handleAlbumUpdateSelectionChange = (e) => {
            setAlbumUpdateSelection(e.target.value);
        };

        //handle position change
        const handleAlbumUpdatePositionChange = (e) => {
            let newPosition = e.target.value;
            // Ensure the entered value is within the range 1-5
            if (newPosition === '' || (parseInt(newPosition) >= 1 && parseInt(newPosition) <= 5)) {
            setAlbumUpdatePosition(newPosition);
            }
        };

    return(
        <div>
            <MyNav currentUser={currentUser} />
            <header className="App-header">
                <Container style={{marginBottom: 15}}>
                    <Row>
                        <Card className="profile shadow" style={{marginBottom: 10}}>
                            {/*<Card.Img variant="top" src={require('./../MiscImages/stock-beach.jpg')}/> //would like to add banner to profiles */}
                            <Image src={require('./../MiscImages/default-profile-photo.jpg')} style={{height: 200, width: 200, marginTop: 10}}roundedCircle/>
                            <h1>{currentUser.username}'s Profile</h1>
                        </Card>
                    </Row>

                    <Row>
                        <Card className="headerCard shadow">
                            <Card.Body>
                                <Row>
                                <h1>Bio:</h1>
                                    {profile.map((profile) => (
                                        <p>{profile.bio}</p>
                                    ))}
                                </Row>
                                
                                <Row>
                                    <Col>
                                    <h2>{currentUser.username}'s Top 5 Artists <ButtonGroup style={{marginBottom: 5}}><Button onClick={handleShowArtists}>Add</Button><Button variant="secondary" onClick={handleShowUpdateArtists}>Edit</Button></ButtonGroup></h2>
                                    {/* ADD ARTISTS TO TOP 5 MODAL*/}
                                    <Modal show={showArtists} onHide={handleCloseArtists} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add to Top Five Artists</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label style={{fontWeight: "bold"}}>Position Number:</Form.Label>
                                                        <Form.Control type="number" min={1} max={5} value={artistPosition} onChange={handleArtistPositionChange}></Form.Control>
                                                    <Form.Label style={{fontWeight: "bold"}}>Artist:</Form.Label>
                                                        <select value={artistSelection} onChange={handleArtistSelectionChange}>
                                                            <option value={''}>Select an Artist</option>
                                                            {artists.map((artist) => (
                                                                <option value={artist.name}>{artist.name}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseArtists}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleSubmitArtists}>
                                                    Submit
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                    {/* UPDATE POSITION ON TOP 5 ARTISTS MODAL*/}
                                    <Modal show={showUpdateArtists} onHide={handleCloseUpdateArtists} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Top Five Artists</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label style={{fontWeight: "bold"}}>Position Number:</Form.Label>
                                                        <Form.Control type="number" min={1} max={5} value={artistUpdatePosition} onChange={handleArtistUpdatePositionChange}></Form.Control>
                                                    <Form.Label style={{fontWeight: "bold"}}>Artist:</Form.Label>
                                                        <select value={artistUpdateSelection} onChange={handleArtistUpdateSelectionChange}>
                                                            <option value={''}>Select an Artist</option>
                                                            {artists.map((artist) => (
                                                                <option value={artist.name}>{artist.name}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseArtists}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleSubmitUpdateArtists}>
                                                    Submit
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                    <ListGroup>
                                        {userArtistList.map((artist) => (
                                            <ListGroup.Item key={artist.position} variant="secondary">{artist.position}. {artist.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h2>{currentUser.username}'s Top 5 Albums <ButtonGroup style={{marginBottom: 5}}><Button onClick={handleShowAlbums}>Add</Button><Button variant="secondary" onClick={handleShowUpdateAlbums}>Edit</Button></ButtonGroup></h2>
                                    {/* ADD ALBUMS TO TOP 5 MODAL*/}
                                    <Modal show={showAlbums} onHide={handleCloseAlbums} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add to Top Five Albums</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label style={{fontWeight: "bold"}}>Position Number:</Form.Label>
                                                        <Form.Control type="number" min={1} max={5} value={albumPosition} onChange={handleAlbumPositionChange}></Form.Control>
                                                    <Form.Label style={{fontWeight: "bold"}}>Album:</Form.Label>
                                                        <select value={albumSelection} onChange={handleAlbumSelectionChange}>
                                                            <option value={''}>Select an Album</option>
                                                            {albums.map((album) => (
                                                                <option value={album.name + '-' + album.artist}>{album.name} - {album.artist}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseAlbums}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleSubmitAlbums}>
                                                    Submit
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                    {/* UPDATE POSITION ON TOP 5 ALBUMS MODAL*/}
                                    <Modal show={showUpdateAlbums} onHide={handleCloseUpdateAlbums} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Top Five Albums</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label style={{fontWeight: "bold"}}>Position Number:</Form.Label>
                                                        <Form.Control type="number" min={1} max={5} value={albumUpdatePosition} onChange={handleAlbumUpdatePositionChange}></Form.Control>
                                                    <Form.Label style={{fontWeight: "bold"}}>Album:</Form.Label>
                                                        <select value={albumUpdateSelection} onChange={handleAlbumUpdateSelectionChange}>
                                                            <option value={''}>Select an Album</option>
                                                            {albums.map((album) => (
                                                                <option value={album.name + '-' + album.artist}>{album.name} - {album.artist}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseUpdateAlbums}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleUpdateAlbums}>
                                                    Submit
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                    <ListGroup>
                                        {userAlbumList.map((album) => (
                                            <ListGroup.Item key={album.position} variant="secondary">{album.position}. {album.name} - {album.artistName}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                </Row>                         
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default Profile;