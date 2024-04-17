import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import MyNav from "../MyComponents/MyNav";

function SearchResults( {currentUser} ) {

    const search = JSON.parse(localStorage.getItem('search')) || [];

    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginTop:5, marginBottom: 15}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>Search Results</h1>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                {search.map((result) => (
                                    <Card className="no-border" style={{width: 1025, marginTop: 5, marginLeft: "auto", marginRight: "auto", marginBottom: 5}}>
                                        <Card.Link href="#name" style={{fontSize: 25, marginLeft: 10}}>{result.name}</Card.Link>
                                        <Card.Text style={{fontSize: 20, marginLeft: 15}}>{result.bio}</Card.Text>
                                    </Card>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    )
}
export default SearchResults;