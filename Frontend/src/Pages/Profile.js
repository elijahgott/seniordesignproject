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
                            <p>maybe throw a nav here with like friends and stuff, maybe not</p>
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
                                    <h1>{currentUser.username}'s Top 5 Artists <Button>Edit</Button></h1>
                                    <ListGroup>
                                        {userArtistList.map((artist) => (
                                            <ListGroup.Item key={artist.position} variant="secondary">{artist.position}. {artist.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h1>{currentUser.username}'s Top 5 Albums <Button>Edit</Button></h1>
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