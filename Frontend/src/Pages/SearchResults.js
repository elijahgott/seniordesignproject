import React from "react";
import { useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import MyNav from "../MyComponents/MyNav";

function SearchResults( {currentUser} ) {
    useEffect(() => {
        document.title ="Music Tracker - Results"
    }, []);

    const search = JSON.parse(localStorage.getItem('search')) || [];

    return(
        <div>
            <header className="App-header">
                <Container style={{marginTop:5, marginBottom: 15}}>
                    <Card style={{minHeight: "100vh", width: "81rem"}}>
                        <Row>
                            <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>Search Results</h1>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col>
                                <Card className="headerCard" style={{maxWidth:"73rem", marginLeft: "4rem"}}>
                                    {search.map((result) => (
                                        <Card className="no-border" style={{width: 1025, marginTop: 5, marginLeft: "auto", marginRight: "auto", marginBottom: 5}}>
                                            <Card.Link href="#name" style={{fontSize: 25, marginLeft: 10}}>{result.name}</Card.Link>
                                            <Card.Text style={{fontSize: 20, marginLeft: 15}}>{result.bio}</Card.Text>
                                        </Card>
                                    ))}
                                </Card>
                            </Col>
                        </Row>
                        <p style={{marginTop: 10, textAlign: "center", fontSize: 15, color: "gray"}}>This page is not fully implemented. I would like to add the ability to add friends for user search results, rate albums for album search results, and more.</p>
                        <p style={{marginTop: 10, textAlign: "center", fontSize: 15, color: "gray"}}>If you want to search again, you must go to another page, like the home page or artists page, and search.</p> 
                    </Card>
                </Container>
            </header>
        </div>
    )
}
export default SearchResults;