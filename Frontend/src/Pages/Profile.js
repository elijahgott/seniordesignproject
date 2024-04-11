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

import MyNav from "../MyComponents/MyNav";

/* app crashes when user not signed in and tries to access profile page */

function Profile({currentUser}){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/userlistartist')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])

    const [dataAlbum, setDataAlbum] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/userlistalbum')
        .then(res => res.json())
        .then(dataAlbum => setDataAlbum(dataAlbum))
        .catch(err => console.log(err));
    }, [])

    const [dataUser, setDataUser] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(dataUser => setDataUser(dataUser))
        .catch(err => console.log(err));
    }, [])

    return(
        <div>
            <MyNav />
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
                                    {dataUser.map((d, i) => ( //if({currentUser.user} == {d.username})
                                        <p>{d.bio}</p>
                                    ))}
                                </Row>
                                
                                <Row>
                                    <Col>
                                    <h1>{currentUser.username}'s Top 5 Artists</h1>
                                    <ListGroup>
                                        {data.map((d, i) => (    
                                        <ListGroup.Item variant="secondary">{i + 1}. {d.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h1>{currentUser.username}'s Top 5 Albums</h1>
                                    <ListGroup>
                                        {dataAlbum.map((d, i) => (    
                                        <ListGroup.Item variant="secondary">{i + 1}. {d.name} - {d.artist}</ListGroup.Item>
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