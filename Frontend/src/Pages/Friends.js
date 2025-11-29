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
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


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

    //fetch all users other than current user
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
        try {
            const response = await fetch(`http://localhost:8081/addFriend/${uid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } 
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        }

        fetchUsers();
    }, []); 

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

        // for adding friends modal
        const [showAdd, setShowAdd] = useState(false);
        const handleCloseAdd = () => setShowAdd(false);
        const handleShowAdd = () => setShowAdd(true);
    
        const [friendUsername, setFriendUsername] = useState('');
        const [friendUID, setFriendUID] = useState('');      
    
        //handle submission of adding friend to userfriend table
        const handleAdd = (event) => {
            event.preventDefault();
        
            fetch('http://localhost:8081/addFriend', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ uid, friendUID }),
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text();
              })
              .then(data => {
                console.log(data);
                handleCloseAdd();
                alert('Successfully Added Friend');
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Error Adding Friend')
              });
          }; 
    
            //handles selection of user from dropdown list
            const handleFriendUIDChange = (e) => {
                setFriendUID(e.target.value);
            };
    
        //for removing friend
        const [removeFriendUID, setRemoveFriendUID] = useState('');

        //handle removing friend from friends list
        const handleRemove = async (removeFriendUID) => {
            try {
                const response = await fetch(`http://localhost:8081/removefriend/${uid}/${removeFriendUID}`, {
                  method: 'DELETE'
                });
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                // Update the friends list after removing the friendship
                setFriends(friends.filter((friend) => friend.id !== removeFriendUID));
                alert("Successfully Removed Friendship!");
              } catch (error) {
                console.error('There was a problem removing the friendship:', error);
                alert("Error Removing Friend");
              }
          }; 

    return !currentUser ? (<div>Loading...</div>)
    : 
      (
        <div>
            <header className="App-header">
                <Container style={{marginBottom: 15}}>
                    <Row>
                        <Card className="mainBody shadow">
                            <Card.Body>
                                <h1>{currentUser.username}'s Friends List <Button style={{marginBottom: 5}} onClick={handleShowAdd}>Add Friend</Button></h1>
                                <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Friend</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Row>
                                                    <Form.Label style={{fontWeight: "bold"}}>Friend Username: </Form.Label>
                                                        <Form.Control disabled type="text" value={friendUsername} placeholder="Search for User... (NOT IMPLEMENTED)"></Form.Control>
                                                    <Form.Label style={{fontWeight: "bold"}}>User:</Form.Label>
                                                        <select value={friendUID} onChange={handleFriendUIDChange}>
                                                            <option value={''}>Select a User</option>
                                                            {users.map((user) => (
                                                                <option value={user.uid}>{user.username}</option>
                                                            ))}
                                                        </select>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseAdd}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleAdd}>
                                                    Add Friend
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                <Row>
                                    {friends.length === 0 ? (<div className="text-center">You don't have any friends 😢</div>)
                                    : 
                                    friends.map((friend) => (
                                        <Card className="shadow" style={{marginBottom: 10}} key={friend.uid}>
                                            <Card.Body>
                                                <Card.Title style={{fontSize: 30, fontWeight: "bold"}}>{friend.username} <Button style={{marginBottom: 5}} variant="danger" onClick={() => handleRemove(friend.uid)}>Remove Friend</Button></Card.Title>
                                                <Card.Text style={{fontSize: 20, textIndent: 5}}>Bio: {friend.bio}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer style={{fontSize: 15, textAlign: "center"}}>Date Joined: {friend.date_joined}</Card.Footer>
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

export default Friends;