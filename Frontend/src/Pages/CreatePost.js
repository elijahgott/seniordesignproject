import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MyNav from '../MyComponents/MyNav.js';

import {currentUser} from '../App.js';
import axios from "axios";

function CreatePost({currentUser}){
    const currentDate = new Date();
    const curDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
    const curTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ":00";
    
    const uid = currentUser.uid;
    const [content, setContent] = useState('');
    const [album_name, setAlbum_name] = useState('');
    const [song_name, setSong_name] = useState('');
    const [photo, setPhoto] = useState('');
    const date = curDate;
    const time = curTime;

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8081/submitpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, content, album_name, song_name, photo, date, time }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            // Handle success message
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error message
          });
      }; 

    return(
        
        <div>
            <MyNav />
            <header className="App-header">
                <Container style={{height: "100vh", marginTop: 15}}>
                    <Card className="shadow">
                            <Form style={{marginRight: 25}} onSubmit={handleSubmit}>
                                <h1 style={{textAlign: "center", marginTop: 10, marginLeft: 15}}>New Post</h1>
                                <Container style={{marginLeft: 15, marginRight: 15}}>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Album Name*</Form.Label>
                                                <Form.Control type="textarea" name="album_name" value={album_name} onChange={(e) => setAlbum_name(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Song Name*</Form.Label>
                                                <Form.Control type="textarea" name="song_name" value={song_name} onChange={(e) => setSong_name(e.target.value)}></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                
                                <Form.Group>
                                    <Form.Label className="text-bold">Post Text*</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="content" value={content} onChange={(e) => setContent(e.target.value)}></Form.Control>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Attach Photo (Optional)</Form.Label>
                                    <Form.Control type="file" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)}></Form.Control>
                                    <p style={{fontSize: 15}}>* denotes required field.</p>
                                </Form.Group>
                                    <Link to="/"><Button variant="secondary">Cancel</Button></Link>
                                    <Button variant="primary" type="submit" style={{marginLeft: 5}}>Submit</Button>
                                    <div style={{marginBottom: 5}} />
                                </Container>
                            </Form>
                    </Card>
                </Container>
            </header>
        </div>
    )
}

export default CreatePost;