import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MyNav from "../MyComponents/MyNav";


function New(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="mainBody shadow">
                            <Card.Body>
                                <Row>
                                    <Col>
                                    <h1>New Music</h1>
                                    - Most Recently Released Albums
                                    </Col>
                                </Row>
                                           
                                <Row>
                                    <h1>Needed Features</h1>  
                                    <p>- Search for Users, Songs, Albums</p>
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