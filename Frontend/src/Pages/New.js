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


function New(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="mainBody">
                            <Card.Body>
                                <Row>
                                    <Col>
                                    <h1>New Music</h1>
                                    New Music and Such
                                    </Col>
                                </Row>
                                <Row>
                                <h1>New Features</h1>  
                                - Display data from database as Cards, rather than in a table.
                                </Row>                        
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default New;