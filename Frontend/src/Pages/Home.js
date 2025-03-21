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

function Home( {currentUser} ){
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
            const response = await fetch(`http://localhost:8081/posts/${uid}`);
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
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginTop:5, marginBottom: 15}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem", minHeight: '100dvh'}}>
                                {currentUser ? (
                                    <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"20px", fontWeight: "bold"}}>Welcome, {currentUser.username}</h1>
                                ) : <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"20px", fontWeight: "bold"}}>Welcome, Guest</h1>}
                                
                                <HomeCarousel />

                                {currentUser ? (
                                    <h2 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>Posts <Link to="/CreatePost"><Button style={{marginBottom: 5}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h2>
                                ) : <h2 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>Posts <Button style={{marginBottom: 5}} disabled><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h2>}
                                
                                
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
                
    </div>
    )
}

export default Home;