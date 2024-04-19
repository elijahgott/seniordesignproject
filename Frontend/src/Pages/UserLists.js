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
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import MyNav from "../MyComponents/MyNav";


function UserLists({currentUser}){
    //creating new list
    const uid = currentUser.uid;
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8081/submitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, name }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            handleClose();
            alert('Successfully Created List');
            // Handle success message
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Creating List')
            // Handle error message
          });
      }; 

    //displaying user lists
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

    const [dataList, setDataList] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/userlist')
        .then(res => res.json())
        .then(dataList => setDataList(dataList))
        .catch(err => console.log(err));
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        //fetch top 5 albums list from current user
        const [userList, setUserList] = useState([]);

        useEffect(() => {
            async function fetchUserList() {
            try {
                const response = await fetch(`http://localhost:8081/userlist/${uid}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserList(data);
            } 
            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            }
    
            fetchUserList();
        }, []); 

    return(
        <div>
            <MyNav currentUser={currentUser} />
            <header className="App-header">
                <Container style={{marginBottom: 15}}>
                    <Row>
                        <Card className="headerCard shadow">
                            <Card.Body>
                            <h1 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>{currentUser.username}'s Lists <Button variant="primary" className="addButton" onClick={handleShow}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                                <Modal show={show} onHide={handleClose} backdrop="static">
                                    <Form>
                                        <Modal.Header closeButton>
                                            <Modal.Title>New List</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Label>List Name</Form.Label>
                                            <Form.Control type="textarea" name="name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                                
                                <Row>
                                    <Col>
                                    <h2>{currentUser.username}'s Top 5 Artists</h2>
                                    <ListGroup>
                                        {userArtistList.map((artist) => (
                                            <ListGroup.Item variant="secondary">{artist.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h2>{currentUser.username}'s Top 5 Albums</h2>
                                    <ListGroup>
                                        {userAlbumList.map((album) => (
                                            <ListGroup.Item variant="secondary">{album.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                </Row>        
                                <Row>
                                <h1 style={{textAlign: 'center'}}>Other Lists</h1>
                                <p>make it so at most 2 lists show per row</p>
                                    {userList.map((list) => (
                                        <h2>{list.name}</h2>
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

export default UserLists;