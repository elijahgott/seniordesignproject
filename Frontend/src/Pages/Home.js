import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import MyNav from "../MyComponents/MyNav";
import HomeCarousel from "../MyComponents/HomeCarousel";
import MyFooter from "../MyComponents/MyFooter";

import {currentUser} from '../App.js'

function Home(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container style={{marginTop:5}}>
                    <Row>
                        <Col>
                            <Card className="headerCard" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>Welcome, {currentUser.user}</h1>
                                <HomeCarousel />
                                
                                <h2 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>Posts <Button variant="primary" className="addButton" onClick={handleShow}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h2>
                                <Modal show={show} onHide={handleClose} backdrop="static">
                                    <Form>
                                        <Modal.Header closeButton>
                                            <Modal.Title>New Post</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Label>Post Text</Form.Label>
                                            <Form.Control type="textarea"></Form.Control>
                                        </Modal.Body>
                                        <Modal.Body>
                                            <Form.Label>Album Name (Optional)</Form.Label>
                                            <Form.Control type="textarea"></Form.Control>
                                        </Modal.Body>
                                        <Modal.Body>
                                            <Form.Label>Song Name (Optional)</Form.Label>
                                            <Form.Control type="textarea"></Form.Control>
                                        </Modal.Body>
                                        <Modal.Body>
                                            <Form.Label>Attach Photo (Optional)</Form.Label>
                                            <Form.Control type="file"></Form.Control>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Submit Post
                                        </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>

                                {data.map((d, i) => (    
                                    <Card style={{width: 1025, marginTop: 10, marginLeft: "auto", marginRight: "auto", marginBottom: 10}} border="secondary">
                                        <Card.Body>
                                            <Card.Img variant="top" src={(`./../MusicImages/${d.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                            <Card.Link href="#artist">{d.uid} (GET USERNAME FROM UID)</Card.Link>
                                            <Card.Text style={{fontSize: 25}}>{d.album_name} - {d.song_name}</Card.Text>
                                            <Card.Text style={{fontSize: 20}}>{d.content}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer style={{fontSize: 15, textAlign: "center"}}>{d.date} - {d.time}</Card.Footer>
                                    </Card>
                    ))}
                            </Card>
                        </Col>
                    </Row>
                </Container>

        </header>
        <MyFooter />
    </div>
    )
}

export default Home;