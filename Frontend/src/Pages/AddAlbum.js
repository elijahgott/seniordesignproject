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
import {useNavigate} from "react-router-dom";

import MyNav from '../MyComponents/MyNav.js';


function AddAlbum( {currentUser} ){
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8081/submitalbum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, artist, description, photo, releaseDate }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            alert('Successfully Added Album');
            navigate('/albums');
            // Handle success message
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Album')
            // Handle error message
          });
      }; 

    return(
        <div>
            <header className="App-header">
                <Container style={{height: "100vh", marginTop: 15}}>
                    <Card className="shadow">
                            <Form style={{marginRight: 25}} onSubmit={handleSubmit}>
                                <h1 style={{textAlign: "center", marginTop: 10, marginLeft: 15}}>Add New Album to Database</h1>
                                <Container style={{marginLeft: 15, marginRight: 15}}>
                                    <Row>
                                        <Col>
                                        <Form.Group>
                                            <Form.Label>Album Name*</Form.Label>
                                            <Form.Control type="textarea" name="name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        </Col>
                                        <Col>
                                        <Form.Group>
                                            <Form.Label>Artist Name*</Form.Label>
                                            <Form.Control type="textarea" name="artist" value={artist} onChange={(e) => setArtist(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                <Form.Group>
                                    <Form.Label className="text-bold">Description*</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="description" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Release Date*</Form.Label>
                                    <Form.Control type="date" name="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Attach Photo</Form.Label>
                                    <Form.Control type="file" disabled="true"></Form.Control>

                                    <Form.Label style={{fontSize: 25}}>Album Photo File Name (include file extension)*</Form.Label>
                                    <Form.Control type="textarea" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)}></Form.Control>
                                    <p style={{fontSize: 15}}>* denotes required field.</p>
                                </Form.Group>
                                    <Link to="/albums"><Button variant="secondary">Cancel</Button></Link>
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

export default AddAlbum;