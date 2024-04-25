import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import MyNav from "../MyComponents/MyNav";

function Settings( {currentUser} ){
    const navigate = useNavigate();

    var uid;
    if(! currentUser){
        uid = null;
    }
    else{
        uid = currentUser.uid;
    }

    const [newUsername, setNewUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);  
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);  
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8081/updateuser/${uid}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newUsername, bio })
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          alert("Succesfully Updated Profile!");
          navigate('/profile');
        } catch (error) {
          console.error('There was a problem updating the bio:', error);
          alert('Error Updating Profile');
        }
      };


    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginBottom: 15}}>
                    <Row>
                        <Card className="mainBody shadow">
                            <Card.Body>
                                <h1>{/*{currentUser.username}*/}'s Account Settings (Not Yet Implemented)</h1>
                                        <Form>
                                            <Row className="settingsRow">
                                                <Col>
                                                    <h3>Username</h3>
                                                        <Form.Control type="username" value={newUsername} onChange={handleUsernameChange} className="me-2" aria-label="Username" />
                                                </Col>
                                                <Col>
                                                    <h3>Profile Picture</h3>
                                                        <Form.Control disabled type="file" />
                                                </Col>
                                            </Row>
                                            <Row className="settingsRow">
                                                <Col>
                                                    <h3>Bio</h3>
                                                        <Form.Control as="textarea" value={bio} onChange={handleBioChange} className="me-2" rows={4} />
                                                </Col>
                                            </Row>
                                            <Row className="settingsRow">
                                                <Button style={{width: "auto", marginLeft: "auto", marginRight: "auto"}} onClick={handleSubmit}>Submit Changes</Button>
                                            </Row>
                                        </Form>                
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default Settings;