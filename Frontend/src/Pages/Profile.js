import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import MyNav from "../MyComponents/MyNav";

function Profile(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="profile">
                            {/*<Card.Img variant="top" src={require('./../MiscImages/stock-beach.jpg')}/> //would like to add banner to profiles */}
                            <Image src={require('./../MiscImages/default-profile-photo.jpg')} style={{height: 200, width: 200, marginTop: 10}}roundedCircle/>
                            <h1>USER's Profile</h1>
                        </Card>
                    </Row>

                    <Row>
                        <Card className="headerCard">
                            <Card.Body>
                                <Row>
                                <h1>Bio:</h1>
                                <p>I'm soooo good</p> {/* need to get bio from database */}
                                </Row>
                                
                                <Row>
                                    <Col>
                                    <h1>USER's Top 5 Albums</h1>
                                    <ListGroup>
                                        <ListGroup.Item variant="secondary">1. More Life - Drake</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">2. Time 'n' Place - Kero Kero Bonito</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">3. Mr. Morale and the Big Steppers - Kendrick Lamar</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">4. Atrocity Exhibition - Danny Brown</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">5. The Life of Pablo - Kanye West</ListGroup.Item>
                                    </ListGroup>
                                    </Col>
                                    <Col>
                                    <h1>USER's Top 5 Artists</h1>
                                    <ListGroup>
                                        <ListGroup.Item variant="secondary">1. Drake</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">2. Kero Kero Bonito</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">3. Kendrick Lamar</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">4. Danny Brown</ListGroup.Item>
                                        <ListGroup.Item variant="secondary">5. Kanye West</ListGroup.Item>
                                    </ListGroup>
                                    </Col>
                                </Row>                         
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default Profile;