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

function Home(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav />
            <header className="App-header">
            
            <Container>
                <Row>
                    <Col>
                        <Card style={{maxWidth:"80rem"}}>
                            <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>Top Albums</h1>
                        </Card>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '25rem'}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require('./../MusicImages/TaylorSwift_1989(Taylor\'s_Version).jpg')}></Card.Img>
                                <Card.Link href="#cardlink">1989 (Taylor's Version)</Card.Link>
                                <Card.Title>Taylor Swift</Card.Title>
                                <Card.Subtitle>#1 Album</Card.Subtitle>
                                <Card.Text>Album Description</Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem'}}>
                            <Card.Body>
                                <Card.Img style={{ justifyContent: "center", display: "flex"}}variant="top" src={require('./../MusicImages/Sampha_Lahai.jpg')}></Card.Img>
                                <Card.Link href="#cardlink">Lahai</Card.Link>
                                <Card.Title>Sampha</Card.Title>
                                <Card.Subtitle>#2 Album</Card.Subtitle>
                                <Card.Text>Album Description</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem'}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require('./../MusicImages/KidsSeeGhosts_KidsSeeGhosts.jpg')}></Card.Img>
                                <Card.Link href="#cardlink">Kids See Ghosts</Card.Link>
                                <Card.Title>Kids See Ghosts</Card.Title>
                                <Card.Subtitle>#3 Album</Card.Subtitle>
                                <Card.Text>Album Description</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <div className="table">
                <Table striped bordered variant="dark">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>User ID</th>
                    <th>Date Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                    <tr key = {i}>
                        <td>{d.username}</td>
                        <td>{d.uid}</td>
                        <td>{d.date_joined}</td> {/*Format to just display MM/DD/YYYY*/}
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>

        </header>
        
        <p>Kinda like a footer if outside of header</p>
    </div>
    )
}

export default Home;