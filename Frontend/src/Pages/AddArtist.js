import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";

function AddArtist(){
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8081/submitartist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, bio, photo }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            alert('Successfully Added Artist');
            navigate('/artists');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Artist');
            // Handle error message
          });
      }; 

    return(
        <div>
            <header className="App-header">
                <Container style={{height: "100vh", marginTop: 15}}>
                    <Card className="shadow">
                            <Form style={{marginRight: 25}} onSubmit={handleSubmit}>
                                <h1 style={{textAlign: "center", marginTop: 10, marginLeft: 15}}>Add New Artist to Database</h1>
                                <Container style={{marginLeft: 15, marginRight: 15}}>
                                <Form.Group>
                                    <Form.Label>Artist Name*</Form.Label>
                                    <Form.Control type="textarea" name="name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="text-bold">Bio*</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="bio" value={bio} onChange={(e) => setBio(e.target.value)}></Form.Control>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Attach Photo</Form.Label>
                                    <Form.Control type="file" disabled="true"></Form.Control>

                                    <Form.Label style={{fontSize: 25}}>Artist Photo File Name (include file extension)*</Form.Label>
                                    <Form.Control type="textarea" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)}></Form.Control>
                                    <p style={{fontSize: 15}}>* denotes required field.</p>
                                </Form.Group>
                                    <Link to="/artists"><Button variant="secondary">Cancel</Button></Link>
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

export default AddArtist;