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

    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="headerCard">
                            <Card.Body>
                                <h1 style={{textAlign: 'center'}}>{currentUser.user}'s Lists <Button variant="primary" className="addButton" ><Image src={require('./../MiscImages/plus-icon-sm.png')} /></Button></h1>
                                <Row>
                                <Col>
                                    <h1>{currentUser.user}'s Top 5 Artists <Button variant="primary">Edit</Button></h1>
                                    <ListGroup>
                                        {data.map((d, i) => (    
                                        <ListGroup.Item variant="secondary">{i + 1}. {d.name}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h1>{currentUser.user}'s Top 5 Albums <Button variant="primary">Edit</Button></h1>
                                    <ListGroup>
                                        <ListGroup.Item variant="secondary">1. More Life - Drake</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">2. Time 'n' Place - Kero Kero Bonito</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">3. Mr. Morale and the Big Steppers - Kendrick Lamar</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">4. Atrocity Exhibition - Danny Brown</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">5. The Life of Pablo - Kanye West</ListGroup.Item>
                                    </ListGroup>
                                    </Col>
                                </Row>       
                                <Row>
                                <h1 style={{textAlign: 'center'}}>Other Lists</h1>
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