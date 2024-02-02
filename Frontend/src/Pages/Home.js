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
        fetch('http://localhost:8081/album')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav />
            <header className="App-header">
            
            <h1 style={{paddingBottom: '20px'}}>Top Albums This Month</h1>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '25rem'}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require('./../MusicImages/TaylorSwift_1989(Taylor\'s_Version).jpg')}></Card.Img>
                                <Card.Link href="#cardlink">1989 (Taylor's Version)</Card.Link>
                                {/*<Card.Title>1989 (Taylor's Version)</Card.Title>*/}
                                <Card.Subtitle>Album good hahaha love it</Card.Subtitle>
                                <Card.Text>Zǎo shang hǎo zhōng guó!</Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem'}}>
                            <Card.Body>
                                <Card.Img style={{ justifyContent: "center", display: "flex"}}variant="top" src={require('./../MusicImages/Sampha_Lahai.jpg')}></Card.Img>
                                <Card.Title>Bing Chilling</Card.Title>
                                <Card.Subtitle></Card.Subtitle>
                                <Card.Text>Zǎo shang hǎo zhōng guó!</Card.Text>
                                <Card.Link href="#cardlink">CCP Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem'}}>
                            <Card.Body>
                                <Card.Img variant="top" src={require('./../MusicImages/KidsSeeGhosts_KidsSeeGhosts.jpg')}></Card.Img>
                                <Card.Title>Bing Chilling</Card.Title>
                                <Card.Subtitle></Card.Subtitle>
                                <Card.Text>Zǎo shang hǎo zhōng guó!</Card.Text>
                                <Card.Link href="#cardlink">CCP Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </header>
        <div>
            <Table striped bordered variant="dark">
            <thead>
                <tr>
                <th>Artist</th>
                <th>Album Name</th>
                <th>Release Date</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                <tr key = {i}>
                    <td>{d.artist}</td>
                    <td>{d.name}</td>
                    <td>{d.releaseDate}</td> {/*Format to just display MM/DD/YYYY*/}
                    <td>{d.description}</td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
        
        <p>Kinda like a footer if outside of header</p>
    </div>
    )
}

export default Home;