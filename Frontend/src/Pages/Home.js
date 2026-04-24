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
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

import MyNav from "../MyComponents/MyNav";
import HomeCarousel from "../MyComponents/HomeCarousel";
// import SignIn from "./SignIn";
import MyFooter from "../MyComponents/MyFooter";

function Home( {currentUser, onSignOut} ){
    useEffect(() => {
        document.title ="Music Tracker - Home"
    }, []);

    //get posts for currently logged in user
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(!currentUser) return

        async function fetchPosts() {
        try {
            const response = await fetch(`/api/posts/user/${currentUser.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);
        } 
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        }

        fetchPosts();
    }, [currentUser]);

    // for post modal
    const [showPostModal, setShowPostModal] = useState(false);
    const handleClosePostModal = () => setShowPostModal(false);
    const handleShowPostModal = () => setShowPostModal(true);

    const [postAlbum, setPostAlbum] = useState('')
    const [postSong, setPostSong] = useState('')
    const [postText, setPostText] = useState('')

    const handleSubmitPost = (event) => {
        event.preventDefault();

        const userId = currentUser.id
    
        fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postAlbum, postText, userId }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.Error);
            }
            return response.json();
          })
          .then(data => {
            setPosts(posts.concat(data))
            handleClosePostModal()
            // Handle success message
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error message
          });
      }; 

    return(
        <div>
            <MyNav currentUser={currentUser} onSignOut={onSignOut} />
            <header className="App-header">
                <Container className="main-body">
                    <Row>
                        <Col>
                            <Card className="headerCard no-border shadow" style={{maxWidth:"81rem", minHeight: '100dvh'}}>
                                {currentUser ? (
                                    <h1 className="title">Welcome, {currentUser.username}</h1>
                                ) : <h1 className="title">Welcome, Guest</h1>}

                                <div className="shadow" style={{maxWidth: '75%', margin: '0 auto', border: '2px solid red', background: 'rgba(255, 0, 0, 0.2)', borderRadius: 8, padding: 8, paddingTop: 16, marginBottom: 8}}>
                                    <p style={{margin: '0 auto', marginBottom: 12, width: '60%', fontSize: 20, color: "black"}}>*** Since completely redoing the backend and migrating to MongoDB, many features have been broken. Among these broken features are posting, rating albums, accessing profiles, and more. I intend on fixing most of these issues in time, but seeing as this is my senior design project from 2024, it may take some time due to this project not being of utmost importance to me anymore, or some original features may be cut.</p>
                                </div>
                                
                                <HomeCarousel />

                                {currentUser ? (
                                    <h2 className="postsTitle">Posts <Button style={{marginBottom: 5}} onClick={handleShowPostModal}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h2>
                                ) : 
                                <>
                                    <h2 className="postsTitle">Posts <Button style={{marginBottom: 5}} disabled><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button>
                                    </h2>
                                    <p className="smallText"><Link to="/SignIn">Sign in</Link> to see posts.</p>
                                </>}   
                                
                                {posts.length > 0 ?
                                posts.map((post) => (
                                    <Card className="shadow" style={{width: "65rem", marginTop: 10, marginBottom: 10, alignSelf: "center", border: '2px solid black'}} border="secondary" key={post.id}>
                                        <Card.Body>
                                            <div style={{display: 'flex', justifyContent: 'left'}}>
                                                <Card.Img variant="top" src={post.album.photoURL} style={{maxWidth: 200, marginRight: 12}} />
                                                <div>
                                                    <Card.Text style={{fontSize: 25, fontWeight: 'bold'}}>{post.album.name}</Card.Text>
                                                    <Card.Link style={{fontWeight: "bold"}}>{post.user.username}</Card.Link>
                                                    <Card.Text style={{fontSize: 20}}>{post.content}</Card.Text>
                                                </div>
                                            </div>
                                            

                                            
                                        </Card.Body>
                                        <Card.Footer style={{fontSize: 15, textAlign: "center"}}>{post.datePosted}</Card.Footer>
                                </Card>
                                ))
                            :
                            (
                                <p style={{margin: '0 auto', fontSize: 20, color: 'gray', marginBottom: 12}}>Nothing to see here...</p>
                            )}
                            </Card>
                        </Col>
                    </Row>

                    <Modal show={showPostModal} onHide={handleClosePostModal} backdrop="static">
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Post</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Album Name*</Form.Label>
                                                <Form.Control type="textarea" name="album_name" value={postAlbum} onChange={(e) => setPostAlbum(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Song Name</Form.Label>
                                                <Form.Control type="textarea" name="song_name" value={postSong} onChange={(e) => setPostSong(e.target.value)}></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                
                                <Form.Group>
                                    <Form.Label className="text-bold">Post Text*</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="content" value={postText} onChange={(e) => setPostText(e.target.value)}></Form.Control>
                                </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClosePostModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmitPost}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                        </Form>
                    </Modal>
                </Container>
        </header>
        <MyFooter />
    </div>
    )
}

export default Home;