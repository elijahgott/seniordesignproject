import React from "react";
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


function UserLists(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="headerCard">
                            <Card.Body>
                                <h1>USER's Lists <Button variant="primary" className="addButton" ><Image src={require('./../MiscImages/plus-icon-sm.png')} /></Button></h1>
                                <Row>
                                    <Col>
                                    <h1>Your Top 5 Albums <Button variant="primary">Edit</Button></h1>
                                    <ListGroup>
                                        <ListGroup.Item variant="secondary">1. More Life - Drake</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">2. Time 'n' Place - Kero Kero Bonito</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">3. Mr. Morale and the Big Steppers - Kendrick Lamar</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">4. Atrocity Exhibition - Danny Brown</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">5. The Life of Pablo - Kanye West</ListGroup.Item>
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h1>Your Top 5 Artists <Button variant="primary">Edit</Button></h1>
                                    
                                    <ListGroup>
                                        <ListGroup.Item variant="secondary">1. Drake</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">2. Kero Kero Bonito</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">3. Kendrick Lamar</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">4. Danny Brown</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">5. Kanye West</ListGroup.Item>
                                    </ListGroup>
                                    </Col>
                                </Row>       
                                <Row>
                                
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