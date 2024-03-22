import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MyNav from "../MyComponents/MyNav";

function Artists(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/artists')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav />
            <header className="App-header">
            
            <Container style={{marginTop: 10}}>
                    <Row>
                        <Col>
                            <Card className="headerCard" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>All Artists</h1>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{marginLeft:0}}>
                    {/*This displays everything correctly, just need to adjust width to match with "All Albums" above*/}
                    {data.map((d, i) => (    
                                    <Card style={{maxWidth:"27rem"}}>
                                        <Card.Body>
                                            <Card.Img variant="top" src={require(`./../MusicImages/${d.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                            <Card.Link href="#artist">{d.name}</Card.Link>
                                            <Card.Text style={{fontSize: 20}}>{d.bio}</Card.Text>
                                        </Card.Body>
                                    </Card>
                    ))}
                    </Row>
            </Container>

            </header>
        
            <div>
        
            </div>
        
            <p>Kinda like a footer if outside of header</p>
        </div>
    )
}

export default Artists;