import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom'

import MyNav from "../MyComponents/MyNav";

function Artists( {currentUser} ){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/artists')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
            
            <Container style={{marginTop: 10, marginBottom: 15}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>All Artists <Link to="/AddArtist"><Button><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h1>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{marginLeft:0, marginTop: 10}}>
                    {data.map((d, i) => (    
                                    <Card className="shadow" style={{maxWidth:"26rem", marginRight: 16, marginBottom: 10}} border="none">
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
        </div>
    )
}

export default Artists;