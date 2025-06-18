import React from "react";
import { useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MyNav from "../MyComponents/MyNav";


function New( {currentUser} ){
    const [newAlbums, setNewAlbums] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/newalbums')
        .then(res => res.json())
        .then(newAlbums => setNewAlbums(newAlbums))
        .catch(err => console.log(err));
  }, [])

    let hasFetched = false;
    if(newAlbums.length > 0){
        hasFetched = true;
    }

    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container className="containerCard shadow">
                        <Row>
                            <Col>
                                <Card className="no-border" style={{maxWidth:"81rem"}}>
                                    <h1 className="title">Newest Albums</h1>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="cardRow">
                            {hasFetched ? 
                                newAlbums.map((albums, i) => (    
                                                <Card style={{maxWidth:"26rem"}}>
                                                    <Card.Body>
                                                        <Card.Img variant="top" src={require(`./../MusicImages/${albums.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                                        <Card.Link>{albums.name}</Card.Link>
                                                        <Card.Title>{albums.artist}</Card.Title>
                                                        <Card.Subtitle>Release Date: {albums.releaseDate}</Card.Subtitle>
                                                        <Card.Text style={{fontSize: 20}}>{albums.description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                )) :
                                <>
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
                                </>
                            }
                        </Row>
                    </Container>
                    <Container style={{marginTop: 30, marginBottom: 15}}>
                        <Row>
                            <Col>
                                <Card className="headerCard shadow" style={{maxWidth:"81rem", paddingBottom: 30}}>
                                    <h1 className="title" >New Features</h1>
                                    <Col style={{maxWidth: "70rem", paddingLeft: 40, paddingRight: 40, alignSelf: "center"}}>
                                        <h2 style={{marginTop: 10}}>Creating Posts</h2>
                                        <p style={{marginTop: 5, textIndent: 20, fontSize: 25}}>Signed-in users are able to create posts and view their friends posts! These posts consist of an album and/or song from that album, and whatever the user wants to write about that album/song. There are plans to allow the user to upload photos as a part of a post, as well.</p>

                                        <h2 style={{marginTop: 10}}>Adding Artists and Albums to Database</h2>
                                        <p style={{marginTop: 5, textIndent: 20, fontSize: 25}}>Signed-in users are able to add new artists and albums to the database! For the time being, users cannot upload artist photos or album photos, meaning a default photo will be used. There are plans to allow users to upload their own photos, however.</p>

                                        <h2 style={{marginTop: 10}}>Rating Albums</h2>
                                        <p style={{marginTop: 5, textIndent: 20, fontSize: 25}}>Signed-in users are able to rate albums they have lsitened to, on a scale of 1-10, which will also add that album onto their Listened List, which is a list of all albums that the user has listened to and rated. Users are also able to edit their ratings of albums already on their listened list.</p>

                                        <h2 style={{marginTop: 10}}>Adding Friends</h2>
                                        <p style={{marginTop: 5, textIndent: 20, fontSize: 25}}>Users can add friends, which will allow the user to view their friends' posts. They are also able to un-add a friend, causing their posts to no longer be on the user's home page.</p>

                                        <h2 style={{marginTop: 10}}>Editing Profiles</h2>
                                        <p style={{marginTop: 5, textIndent: 20, fontSize: 25}}>Signed-in users can edit their basic profile information, such as their username and bio, and these changes will take effect for their friends, and on their previous posts.</p>

                                        <h2 style={{marginTop: 10}}>And More!</h2>
                                    </Col>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
            </header>
        </div>
    )
}

export default New;