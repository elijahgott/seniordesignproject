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
import { Link } from 'react-router-dom';

import MyNav from "../MyComponents/MyNav";

function UserLists({currentUser}){
    const currentDate = new Date();

    //values to send to database when adding album to listened list
    const uid = currentUser.uid;
    const [selection, setSelection] = useState('');
    let album = '';
    let artist = '';
    const dateAdded = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
    const [rating, setRating] = useState('');

    let temp = selection;
    console.log("temp: " + temp);

    //leftover from creating new lists 
    const [name, setName] = useState('');

    
    //fetch all albums from database
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/albums')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    
      //handles selection of album from dropdown list
      const handleSelectionChange = (e) => {
        setSelection(e.target.value);
      };

      //handle rating change
      const handleChange = (e) => {
        let newRating = e.target.value;
        // Ensure the entered value is within the range 1-10
        if (newRating === '' || (parseInt(newRating) >= 1 && parseInt(newRating) <= 10)) {
          setRating(newRating);
        }
      };

      //handle submission of album to listened list
    const handleSubmit = (event) => {
        event.preventDefault();
        
        //split dropdown selection into album and artist
        let temp = selection.split('-');
        album = (temp[0]);
        console.log("album: "+ album);
        artist = (temp[1]);
        console.log("artist: " + artist);
    
        fetch('http://localhost:8081/submitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, album, artist, dateAdded, rating }),
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
            alert('Successfully Added Album to Listened List');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error Adding Album to Listened List')
          });
      }; 

    //for modal
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
                            <h1 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>{currentUser.username}'s Lists <Button disabled variant="primary" className="addButton" onClick={handleShow}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                            {/*
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
                                </Modal>*/}
                                
                                <Row>
                                    <Col>
                                    <h2>{currentUser.username}'s Top 5 Artists <Button>Edit</Button></h2>
                                    <ListGroup>
                                        {userArtistList.map((artist) => (
                                            <ListGroup.Item key={artist.position} variant="secondary">{artist.position}. {artist.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h2>{currentUser.username}'s Top 5 Albums <Button>Edit</Button></h2>
                                    <ListGroup>
                                        {userAlbumList.map((album) => (
                                            <ListGroup.Item key={album.position} variant="secondary">{album.position}. {album.name} - {album.artistName}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                </Row>        

                                <Row>
                                    <h1 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>{currentUser.username}'s Listened List <Button variant="primary" className="addButton" onClick={handleShow}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                                    <Modal show={show} onHide={handleClose} backdrop="static">
                                        <Form>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Album To Listened List</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form.Label>Album: </Form.Label>
                                                    <select value={selection} onChange={handleSelectionChange}>
                                                        <option value={''}>Select an Album</option>
                                                        {data.map((album) => (
                                                            <option value={album.name +'-'+ album.artist}>{album.name} - {album.artist}</option>
                                                        ))}
                                                    </select>
                                                <Form.Label>Album Rating: </Form.Label>
                                                    <Form.Control type="number" min={1} max={10} value={rating} onChange={handleChange}></Form.Control>
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
                                </Row>
                                <Row style={{marginLeft: 0, marginTop: 10}}>
                                {userList.map((list) => (    
                                                <Card className="shadow" style={{maxWidth:"25rem", marginRight: 8, marginLeft: 8, marginBottom: 10}}>
                                                    <Card.Body>
                                                        {/*<Card.Img variant="top" src={require(`./../MusicImages/${album.photo}`)} style={{maxWidth: 500}}></Card.Img>*/}
                                                        <Card.Title style={{textAlign: "center", fontWeight: "bold", fontSize: 25}}>{list.album} - {list.artist}</Card.Title>
                                                        <Card.Text style={{fontSize: 15, textAlign: "center"}}>Your Rating: {list.rating} / 10</Card.Text>
                                                    </Card.Body>
                                                    <Card.Text style={{fontSize: 10, textAlign: "center", color: "gray"}}>Date Added: {list.dateAdded}</Card.Text>
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

export default UserLists;