import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MyNav from "../MyComponents/MyNav";

function About(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h1>About MUSIC APP</h1>
                                    This is totally my senior design project. It is inspired mainly by <a href="https://letterboxd.com/">Letterboxd</a>, which I have found useful for tracking the movies I want to watch and have already watched. In a previous course, a partner and I made a similar, yet very simple, application for video games, so it felt natural for my Senior Design Project to be in the same vein, but expanded upon and modernized.
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default About;