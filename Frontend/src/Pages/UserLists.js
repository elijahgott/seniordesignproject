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
import { currentUser } from "../App";


function UserLists(){
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

    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="headerCard">
                            <Card.Body>
                            <h1 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>{currentUser.user}'s Lists <Button variant="primary" className="addButton" onClick={handleShow}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                                <Modal show={show} onHide={handleClose} backdrop="static">
                                    <Form>
                                        <Modal.Header closeButton>
                                            <Modal.Title>New List</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Label>List Name</Form.Label>
                                            <Form.Control type="textarea"></Form.Control>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Submit
                                        </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                                
                                <Row>
                                    <Col>
                                    <h2>{currentUser.user}'s Top 5 Artists</h2>
                                    <ListGroup>
                                        {data.map((d, i) => (    
                                        <ListGroup.Item variant="secondary">{i + 1}. {d.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h2>{currentUser.user}'s Top 5 Albums</h2>
                                    <ListGroup>
                                        {dataAlbum.map((d, i) => (    
                                        <ListGroup.Item variant="secondary">{i + 1}. {d.name} - {d.artist}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                </Row>        
                                <Row>
                                <h1 style={{textAlign: 'center'}}>Other Lists</h1>
                                {dataList.map((d, i) => (
                                    <>
                                        <h2>{d.name}</h2>
                                        GET SONGS WHERE SONG LIST NAME = LIST NAME
                                    </>  
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