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
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import MyNav from "../MyComponents/MyNav";
import MyFooter from "../MyComponents/MyFooter";

function Albums( {currentUser, onSignOut, fetchUser, setNotification} ){
    useEffect(() => {
        document.title ="Music Tracker - Albums"
    }, []);

    const currentDate = new Date();
    const [albums, setAlbums] = useState([])

    useEffect(()=>{
        fetch('/api/albums')
        .then(res => res.json())
        .then(data => setAlbums(data))
        .catch(err => setNotification('Albums could not be fetched', 'error'));
  }, [])

  const formatDate = (date) => {
    const d = new Date(date);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();

    return `${mm}/${dd}/${yyyy}`
  }

// FETCH TOP THREE ALBUMS
//   const [topThreeAlbums, setTopThreeAlbums] = useState([])

//   useEffect(()=>{
//       fetch('/api/topthreealbums')
//       .then(res => res.json())
//       .then(topThreeAlbums => setTopThreeAlbums(topThreeAlbums))
//       .catch(err => console.log(err));
// }, [])

// RENDER TOP THREE ALBUMS
// topThreeAlbums.map((albums, i) => (    
//                 <Card style={{maxWidth:"26rem"}}>
//                     <Card.Body>
//                         <Card.Img variant="top" src={require(`./../MusicImages/${albums.photo}`)} style={{maxWidth: 500}}></Card.Img>
//                         <Card.Link>{albums.name}</Card.Link>
//                         <Card.Title>{albums.artist}</Card.Title>
//                         <Card.Subtitle>#{i+1} Album</Card.Subtitle>
//                         <Card.Subtitle style={{marginTop: 3}}>Average Rating: {albums.average_rating}</Card.Subtitle>
//                         <Card.Text style={{fontSize: 20}}>{albums.description}</Card.Text>
//                     </Card.Body>
//                 </Card>
// ))

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
    uid = currentUser.id;
}

const [album, setAlbum] = useState('');
const dateAdded = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
const [rating, setRating] = useState('');

//handle starting rating - pass album and artist data from data.map
const handleStartRating = (albumId) => {
    handleShowRating();
    setAlbum(albumId);
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

      fetch(`/api/users/${uid}/ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ album, rating }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            handleCloseRating();
            setNotification('Rated album!', 'success')
            fetchUser()
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setNotification('Problem rating album.', 'error')
          });
  }; 

  // EDIT RATING
const [showEditRating, setShowEditRating] = useState(false);
const handleCloseEditRating = () => setShowEditRating(false);
const handleShowEditRating = () => setShowEditRating(true);

  //handle starting edit rating
const handleStartEditRating = (albumId) => {
    handleShowEditRating();
    setAlbum(albumId);
}

//handle submission of album and rating to listened list
const handleSubmitEditRating = (event) => {
    event.preventDefault();

      fetch(`/api/users/${uid}/ratings`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ album, rating }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            handleCloseEditRating();
            setNotification('Updated rating!', 'success')
            fetchUser()
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setNotification('Could not update rating.', 'error')
          });
  }; 

  // ADD ALBUM MODAL
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const [albumName, setAlbumName] = useState('')

  const [albumArtistName, setAlbumArtistName] = useState('')
  const [artistSuggestions, setArtistSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if(!albumArtistName){
        setArtistSuggestions([])
        return
    }

    const timeout = setTimeout(() => {
        fetch(`/api/artists/search?q=${albumArtistName}`)
            .then(res => res.json())
            .then(data => setArtistSuggestions(data))
            .catch(console.error)
    }, 300)

    return () => clearTimeout(timeout)
  }, [albumArtistName])

  const [albumDescription, setAlbumDescription] = useState('')
  const [albumGenres, setAlbumGenres] = useState('')
  const [albumReleaseDate, setAlbumReleaseDate] = useState('')
  const [albumPhotoUrl, setAlbumPhotoUrl] = useState('')

  const handleSubmitAlbum = (event) => {
    event.preventDefault()

    if(albumName, albumArtistName, albumDescription, albumReleaseDate, albumPhotoUrl, albumGenres){
        fetch('/api/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ albumName, albumArtistName, albumDescription, albumGenres, albumReleaseDate, albumPhotoUrl }),
        })
          .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.error)
              })
            }
            return response.json();
          })
          .then(data => {
            setAlbums(albums.concat(data))
            setAlbumArtistName('')
            setAlbumDescription('')
            setAlbumGenres('')
            setAlbumReleaseDate('')
            setAlbumPhotoUrl('')

            handleCloseModal()
            setNotification('Created album!', 'success')
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setNotification('Could not create album.', 'error')
          });
    }
    else{
        setNotification('All fields must be filled.', 'error')
    }
  }

    return(
        <div>
            <MyNav currentUser={currentUser} onSignOut={onSignOut} />
            <header className="App-header">
                <Container className="containerCard shadow">
                    <Row>
                        <Col>
                            <Card className="no-border" style={{maxWidth:"81rem"}}>
                                <h1 className="title">Top Albums</h1>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="cardRow">
                        <Card style={{maxWidth:"26rem"}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require(`./../MusicImages/AliceInChains_Dirt.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                <Card.Link>Dirt</Card.Link>
                                <Card.Title>Alice In Chains</Card.Title>
                                <Card.Subtitle>Release Date: September 29, 1992</Card.Subtitle>
                                <Card.Text style={{fontSize: 20}}>Alice in Chains' second studio album.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{maxWidth:"26rem"}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require(`./../MusicImages/AliceInChains_Facelift.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                <Card.Link>Facelift</Card.Link>
                                <Card.Title>Alice In Chains</Card.Title>
                                <Card.Subtitle>Release Date: August 21, 1990</Card.Subtitle>
                                <Card.Text style={{fontSize: 20}}>Alice in Chains' debut studio album.</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{maxWidth:"26rem"}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require(`./../MusicImages/Nirvana_Bleach.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                <Card.Link>Bleach</Card.Link>
                                <Card.Title>Nirvana</Card.Title>
                                <Card.Subtitle>Release Date: June 15, 1989</Card.Subtitle>
                                <Card.Text style={{fontSize: 20}}>Nirvana's debut studio album.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>

                    <Row style={{marginTop: 30}}>
                        <Col>
                        {currentUser ? (
                            <Card className="headerCard" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>All Albums <Button onClick={handleOpenModal} style={{marginBottom: 7}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                            </Card>
                        ) :
                            <Card className="headerCard" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>All Albums <Button disabled style={{marginBottom: 7}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                            </Card>
                        }
                            
                        </Col>
                    </Row>
                    <Modal show={showRating} onHide={handleCloseRating} backdrop="static">
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Rate Album</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Row style={{margin: "0 auto", width: "75%"}}>
                                        <Form.Label style={{fontWeight: "bold", marginLeft: -8}}>Album Rating:</Form.Label>
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
                    <Modal show={showEditRating} onHide={handleCloseEditRating} backdrop="static">
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Rating</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Row style={{margin: "0 auto", width: "75%"}}>
                                        <Form.Label style={{fontWeight: "bold", marginLeft: -8}}>Album Rating:</Form.Label>
                                        <Form.Control type="number" min={1} max={10} value={rating} onChange={handleRatingChange}></Form.Control>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditRating}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmitEditRating}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                        </Form>
                    </Modal>
                    {currentUser ?
                    (
                        <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem", marginBottom: 16}}>
                            {albums.length > 0 ? 
                                albums.map((d, i) => {
                                    const ratingObj = currentUser?.ratings?.find(r => r.album === d.id)
                                    
                                    return (  
                                                <Card key={i} className="shadow" style={{maxWidth:"26rem"}}>
                                                    <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                                                        <Card.Img variant="top" src={d.photoURL} style={{width: 358, height: 358}}></Card.Img>
                                                        <Card.Link>{d.name}</Card.Link>
                                                        <Card.Title>{d.artist.name}</Card.Title>
                                                        <Card.Text style={{fontSize: 20, margin: 0}}>{d.description}</Card.Text>
                                                        <div style={{ marginTop: 'auto'}}>
                                                            <p className="smallText" style={{ textAlign: 'center', marginBottom: 0}}>Released: {formatDate(d.releaseDate)}</p>
                                                        </div>
                                                    </Card.Body>
                                                    <Card.Footer style={{background: 'none'}}>
                                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                            {ratingObj ?
                                                            (
                                                                <div>
                                                                    <p className="smallText" style={{margin: 0}}>Your Rating: {ratingObj.rating}</p>
                                                                    <Button onClick={() => {handleStartEditRating(d.id); setRating(ratingObj.rating)}}>Update Rating</Button>
                                                                </div>
                                                            ) :
                                                            <Button onClick={() => {handleStartRating(d.id); setRating(1)}}>Rate Album</Button>}
                                                        </div>
                                                    </Card.Footer>
                                                </Card>
                                )})
                                :
                                <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem"}}>
                                    <p className="smallText notLoaded">Nothing to see here...</p>
                                </Row>
                                }
                        </Row>
                    ) :
                    (
                        <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem", marginBottom: 16}}>
                            {albums.length > 0 ? 
                                albums.map((d, i) => (    
                                        <Card key={i} className="shadow" style={{maxWidth:"26rem"}}>
                                            <Card.Body>
                                                <Card.Img variant="top" src={d.photoURL} style={{width: 358, height: 358}}></Card.Img>
                                                <Card.Link>{d.name}</Card.Link>
                                                <Card.Title>{d.artist.name}</Card.Title>
                                                <Card.Text style={{fontSize: 20}}>{d.description}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                ))
                            :
                            (<Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem"}}>
                                <p className="smallText notLoaded">Nothing to see here...</p>
                            </Row>)
                            }
                        </Row>
                    )
                }
                </Container>

                <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Album</Modal.Title>
                        </Modal.Header>
                            <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                                <Row className="modalRow">
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="album_name" value={albumName} onChange={(e) => setAlbumName(e.target.value)} required ></Form.Control>
                                    </Form.Group>
                                </Row>
                                <Row className="modalRow">
                                    <Form.Group>
                                        <Form.Label>Artist</Form.Label>
                                        <div style={{ display: 'relative' }}>
                                            <Form.Control type="text" name="album_artist" value={albumArtistName} onChange={(e) => {
                                                setAlbumArtistName(e.target.value)
                                                setShowSuggestions(true)
                                            }}
                                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                                            placeholder="Search artist..."
                                            autoComplete="off"
                                            required
                                            />

                                            {showSuggestions && artistSuggestions.length > 0 && (
                                                <div style={{ position: 'absolute', width: '93%', zIndex: 10, backgroundColor: 'white', border: '2px solid rgb(220, 220, 220)', borderRadius: '0px 0px 16px 16px'}}>
                                                    {artistSuggestions.map((artist) => {
                                                        return (
                                                            <div key={artist._id} style={{ padding: 8, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                setAlbumArtistName(artist.name)
                                                                setShowSuggestions(false)
                                                            }}>
                                                                {artist.name}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                        
                                    </Form.Group>
                                </Row>
                                <Row className="modalRow">
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="album_desc" value={albumDescription} maxLength={255} onChange={(e) => setAlbumDescription(e.target.value)}></Form.Control>
                                    </Form.Group>
                                </Row>
                                <Row className="modalRow">
                                    <Form.Group>
                                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                            <Form.Label>Genres</Form.Label>
                                            <p style={{ fontSize: 12, color: 'rgb(128, 128, 128)', marginLeft: 4}}>(separate with ',')</p>
                                        </div>
                                        <Form.Control type="text" name="album_genres" value={albumGenres} onChange={(e) => setAlbumGenres(e.target.value)}></Form.Control>
                                    </Form.Group>
                                </Row>
                                <Row className="modalRow">
                                    <Form.Group>
                                        <Form.Label>Release Date</Form.Label>
                                        <Form.Control type="date" name="album_release_date" value={albumReleaseDate} onChange={(e) => setAlbumReleaseDate(e.target.value)}></Form.Control>
                                    </Form.Group>
                                </Row>
                                <Row className="modalRow">
                                    <Form.Group>
                                        <Form.Label>Photo URL</Form.Label>
                                        <Form.Control type="text" name="album_photo_url" value={albumPhotoUrl} onChange={(e) => setAlbumPhotoUrl(e.target.value)}></Form.Control>
                                    </Form.Group>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSubmitAlbum}>
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

export default Albums;