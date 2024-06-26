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
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";

import MyNav from "../MyComponents/MyNav";

function UserLists({currentUser}){
    const currentDate = new Date();
    const navigate = useNavigate();
    
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

// ADD ALBUM AND RATING TO LISTENED LIST
    //values to send to database when adding album to listened list
    const uid = currentUser.uid;
    const [listSelection, setListSelection] = useState('');
    let album = '';
    let artist = '';
    const dateAdded = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
    const [rating, setRating] = useState('');

    let temp = listSelection;

      //handles selection of album from dropdown list
      const handleListSelectionChange = (e) => {
        setListSelection(e.target.value);
      };

      //handle rating change
      const handleChange = (e) => {
        let newRating = e.target.value;
        // Ensure the entered value is within the range 1-10
        if (newRating === '' || (parseInt(newRating) >= 1 && parseInt(newRating) <= 10)) {
          setRating(newRating);
        }
      };

    //handle submission of album to listened list
    const handleSubmit = (event) => {
        event.preventDefault();
        
        //split dropdown selection into album and artist
        let temp = listSelection.split('-');
            album = (temp[0]);
            artist = (temp[1]);
    
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
            handleCloseListened();
            navigate('/lists');
            alert('Successfully Added Album to Listened List');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Album to Listened List')
          });
      }; 

    //for listened list modal
    const [showListened, setShowListened] = useState(false);
    const handleCloseListened = () => setShowListened(false);
    const handleShowListened = () => setShowListened(true);

    // UPDATE RATING ON LISTENED LIST
        //values to send to database to update album on listened list
        const [listUpdateSelection, setListUpdateSelection] = useState('');
        let albumUpdate = '';
        let artistUpdate = '';
        const dateUpdated = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
        const [ratingUpdate, setRatingUpdate] = useState('');

        let temp2 = listUpdateSelection;

      //handles selection of album from dropdown list
      const handleListUpdateSelectionChange = (e) => {
        setListUpdateSelection(e.target.value);
      };

      //handle rating change
      const handleUpdateChange = (e) => {
        let newRating = e.target.value;
        // Ensure the entered value is within the range 1-10
        if (newRating === '' || (parseInt(newRating) >= 1 && parseInt(newRating) <= 10)) {
          setRatingUpdate(newRating);
        }
      };

    //handle submission of album to listened list
    const handleUpdateList = (event) => {
        event.preventDefault();
        
        //split dropdown selection into album and artist
        let temp2 = listUpdateSelection.split('-');
            albumUpdate = (temp2[0]);
            artistUpdate = (temp2[1]);
    
        fetch('http://localhost:8081/updatelist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, albumUpdate, artistUpdate, dateUpdated, ratingUpdate }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleCloseUpdateListened();
            alert('Successfully Updated Album Rating on Listened List');
            navigate('/lists');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Updating Album Rating on Listened List')
          });
      }; 

    //for listened list modal
    const [showUpdateListened, setShowUpdateListened] = useState(false);
    const handleCloseUpdateListened = () => setShowUpdateListened(false);
    const handleShowUpdateListened = () => setShowUpdateListened(true);

      //GETTING DATA TO DISPLAY
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

        //fetch top 5 albums list from current user
        const [userList, setUserList] = useState([]);

        useEffect(() => {
            async function fetchUserList() {
            try {
                const response = await fetch(`http://localhost:8081/userlist/${uid}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserList(data);
            } 
            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            }
    
            fetchUserList();
        }, []); 

    // ADDING TO ARTIST LIST
    // for top 5 artists modal
    const [showArtists, setShowArtists] = useState(false);
    const handleCloseArtists = () => setShowArtists(false);
    const handleShowArtists = () => setShowArtists(true);

    //let position = '';
    const [artistPosition, setArtistPosition] = useState('');
    const [artistSelection, setArtistSelection] = useState('');

    //handle submission of artist to listened list
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

        //handles selection of artist from dropdown list
        const handleArtistSelectionChange = (e) => {
            setArtistSelection(e.target.value);
        };

        //handles artist position change
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

    // ADD ALBUMS TO LIST
    // for top 5 albums modal
    const [showAlbums, setShowAlbums] = useState(false);
    const handleCloseAlbums = () => setShowAlbums(false);
    const handleShowAlbums = () => setShowAlbums(true);

    const [albumPosition, setAlbumPosition] = useState('');
    const [albumSelection, setAlbumSelection] = useState('');

    //handle submission of album to listened list
    const handleSubmitAlbums = (event) => {
        event.preventDefault();
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

        //handle position change
        const handleAlbumPositionChange = (e) => {
            let newPosition = e.target.value;
            // Ensure the entered value is within the range 1-5
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
                        <Card className="headerCard shadow">
                            <Card.Body>
                            <h1 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>{currentUser.username}'s Lists <Button style={{marginBottom: 5}} disabled variant="primary" className="addButton"><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>    
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
                                                <Button variant="secondary" onClick={handleCloseUpdateArtists}>
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

                                <Row>
                                    <h1 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>{currentUser.username}'s Listened List <ButtonGroup style={{marginBottom: 5}}><Button variant="primary" className="addButton" onClick={handleShowListened}>Add</Button><Button variant="secondary" onClick={handleShowUpdateListened}>Edit</Button></ButtonGroup></h1>
                                    <Modal show={showListened} onHide={handleCloseListened} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Album To Listened List</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label>Album: <br></br></Form.Label>
                                                        <select value={listSelection} onChange={handleListSelectionChange}>
                                                            <option value={''}>Select an Album</option>
                                                            {albums.map((album) => (
                                                                <option value={album.name +'-'+ album.artist}>{album.name} - {album.artist}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                                <Row>
                                                    <Form.Label>Album Rating: </Form.Label>
                                                        <Form.Control type="number" min={1} max={10} value={rating} onChange={handleChange}></Form.Control>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseListened}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                    <Modal show={showUpdateListened} onHide={handleCloseUpdateListened} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Update Album Rating on Listened List</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label>Album: <br></br></Form.Label>
                                                        <select value={listUpdateSelection} onChange={handleListUpdateSelectionChange}>
                                                            <option value={''}>Select an Album</option>
                                                            {albums.map((album) => (
                                                                <option value={album.name +'-'+ album.artist}>{album.name} - {album.artist}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                                <Row>
                                                    <Form.Label>Album Rating: </Form.Label>
                                                        <Form.Control type="number" min={1} max={10} value={ratingUpdate} onChange={handleUpdateChange}></Form.Control>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseUpdateListened}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleUpdateList}>
                                                Submit
                                            </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                </Row>
                                <Row style={{marginLeft: 0, marginTop: 10}}>
                                {userList.map((list) => (    
                                                <Card className="shadow" style={{maxWidth:"25rem", marginRight: 8, marginLeft: 8, marginBottom: 10}}>
                                                    <Card.Body>
                                                        {/*<Card.Img variant="top" src={require(`./../MusicImages/${album.photo}`)} style={{maxWidth: 500}}></Card.Img>*/}
                                                        <Card.Title style={{textAlign: "center", fontWeight: "bold", fontSize: 25}}>{list.album} - {list.artist}</Card.Title>
                                                        <Card.Text style={{fontSize: 15, textAlign: "center"}}>Your Rating: {list.rating} / 10</Card.Text>
                                                    </Card.Body>
                                                    <Card.Text style={{fontSize: 10, textAlign: "center", color: "gray"}}>Date Added: {list.dateAdded}</Card.Text>
                                                </Card>
                                ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default UserLists;