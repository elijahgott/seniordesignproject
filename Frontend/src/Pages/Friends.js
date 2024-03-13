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
import {Link} from 'react-router-dom';


import MyNav from "../MyComponents/MyNav";


function Friends(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="mainBody">
                            <Card.Body>
                                <h1>Friends List</h1>
                                <Row>
                                    <Col>
                                    <ListGroup>
                                        <ListGroup.Item variant="secondary"><Image src={require('./../MiscImages/default-profile-photo.jpg')} style={{height: 50, width: 50}}roundedCircle></Image> <Link to="#conner">Conner Biernat</Link></ListGroup.Item>
                                        <ListGroup.Item variant="secondary"><Image src={require('./../MiscImages/default-profile-photo.jpg')} style={{height: 50, width: 50}}roundedCircle></Image> <Link to="#conner">Henry Sharp</Link></ListGroup.Item>
                                        <ListGroup.Item variant="secondary"><Image src={require('./../MiscImages/default-profile-photo.jpg')} style={{height: 50, width: 50}}roundedCircle></Image> <Link to="#conner">Finn Galvin</Link></ListGroup.Item>
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

export default Friends;