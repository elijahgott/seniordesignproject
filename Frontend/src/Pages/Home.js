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
import SignIn from "./SignIn";
import MyFooter from "../MyComponents/MyFooter";

function Home( {currentUser, onSignOut} ){
    useEffect(() => {
        document.title ="Music Tracker - Home"
    }, []);

    var uid;
    if(! currentUser){
        uid = null;
    }
    else{
        uid = currentUser.uid;
    }

    //get posts for currently logged in user
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
        try {
            const response = await fetch(`/posts/${uid}`);
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
    }, []);

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

                                <p style={{margin: '0 auto', marginBottom: 12, width: '60%', fontSize: 20, color: "gray"}}>*** Since completely redoing the backend and migrating to MongoDB, many features have been broken. Among these broken features are posting, rating albums, accessing profiles, and more. I intend on fixing most of these issues in time, but seeing as this is my senior design project from 2024, it may take some time due to this project not being of utmost importance to me anymore, or some original features may be cut.</p>
                                
                                <HomeCarousel />

                                {currentUser ? (
                                    <h2 className="postsTitle">Posts <Link to="/CreatePost"><Button style={{marginBottom: 5}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h2>
                                ) : 
                                <>
                                    <h2 className="postsTitle">Posts <Button style={{marginBottom: 5}} disabled><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button>
                                    </h2>
                                    <p className="smallText"><Link to="/SignIn">Sign in</Link> to see posts.</p>
                                </>}   
                                
                                {posts.map((post) => (
                                    <Card style={{width: "65rem", marginTop: 10, marginBottom: 10, alignSelf: "center"}} border="secondary">
                                        <Card.Body>
                                            {/*<Card.Img variant="top" src={(`./../MusicImages/${d.photo}`)} style={{maxWidth: 500}}></Card.Img> havent implemented post photos*/} 
                                            <Card.Link style={{fontWeight: "bold"}}>{post.username}</Card.Link>
                                            <Card.Text style={{fontSize: 25}}>{post.album_name} - {post.song_name}</Card.Text>
                                            <Card.Text style={{fontSize: 20, textIndent: 5}}>{post.content}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer style={{fontSize: 15, textAlign: "center"}}>{post.date} - {post.time}</Card.Footer>
                                </Card>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </header>
        <MyFooter />
    </div>
    )
}

export default Home;