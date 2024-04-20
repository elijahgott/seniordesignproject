import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';


import MyNav from "../MyComponents/MyNav";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

function Friends( {currentUser} ){
    var uid;
    if(! currentUser){
        uid = null;
    }
    else{
        uid = currentUser.uid;
    }

    //get friends list for currently logged in user
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchFriends() {
        try {
            const response = await fetch(`http://localhost:8081/friends/${uid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFriends(data);
        } 
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        }

        fetchFriends();
    }, []);

    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginBottom: 15}}>
                    <Row>
                        <Card className="mainBody shadow">
                            <Card.Body>
                                <h1>{currentUser.username}'s Friends List</h1>
                                <Row>
                                    <Col>
                                    <ListGroup>
                                        {friends.map((friend) => (
                                            <ListGroupItem variant="secondary">{friend.username}</ListGroupItem>
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

export default Friends;