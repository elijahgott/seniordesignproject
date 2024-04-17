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
import { Link } from "react-router-dom";

import MyNav from "../MyComponents/MyNav";

function Albums( {currentUser} ){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/albums')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])

  const dir = "./../MusicImages/";
  var path;


    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginTop: 5}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>Top Albums (Still need to get top 3 from database)</h1>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <Col>
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Img variant="top" src={require('./../MusicImages/TaylorSwift_1989(Taylor\'s_Version).jpg')}></Card.Img>
                                    <Card.Link href="#cardlink">1989 (Taylor's Version)</Card.Link>
                                    <Card.Title>Taylor Swift</Card.Title>
                                    <Card.Subtitle>#1 Album</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Img style={{ justifyContent: "center", display: "flex"}}variant="top" src={require('./../MusicImages/Sampha_Lahai.jpg')}></Card.Img>
                                    <Card.Link href="#cardlink">Lahai</Card.Link>
                                    <Card.Title>Sampha</Card.Title>
                                    <Card.Subtitle>#2 Album</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Img variant="top" src={require('./../MusicImages/KidsSeeGhosts_KidsSeeGhosts.jpg')}></Card.Img>
                                    <Card.Link href="#cardlink">Kids See Ghosts</Card.Link>
                                    <Card.Title>Kids See Ghosts</Card.Title>
                                    <Card.Subtitle>#3 Album</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                    
                <Container style={{marginTop: 20, marginBottom: 15}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>All Albums <Link to="/AddAlbum"><Button><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h1>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{marginLeft: 0, marginTop: 10}}>
                    {/*This displays everything correctly, just need to adjust width to match with "All Albums" above*/}
                    {data.map((d, i) => (    
                                    <Card className="shadow" style={{maxWidth:"27rem"}}>
                                        <Card.Body>
                                            <Card.Img variant="top" src={require(`./../MusicImages/${d.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                            <Card.Link>{d.name}</Card.Link>
                                            <Card.Title>{d.artist}</Card.Title>
                                            <Card.Text style={{fontSize: 20}}>{d.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                    ))}
                    </Row>
                </Container>
            </header>
    </div>
    )
}

export default Albums;