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
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'

import MyNav from "../MyComponents/MyNav";
import HomeCarousel from "../MyComponents/HomeCarousel";

function Home( {currentUser} ){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/home')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(users => setUsers(users))
        .catch(err => console.log(err));
    }, [])
  
    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginTop:5, marginBottom: 15}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                {currentUser ? (
                                    <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>Welcome, {currentUser.username}</h1>
                                ) : <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>Welcome, Guest</h1>}
                                
                                <HomeCarousel />

                                <h2 style={{textAlign:"center", marginBottom: 10, marginTop: 10}}>Posts <Link to="/CreatePost"><Button><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h2>
                                
                                {data.map((d, i) => (    
                                    <Card style={{width: 1025, marginTop: 10, marginLeft: "auto", marginRight: "auto", marginBottom: 10}} border="secondary">
                                        <Card.Body>
                                            <Card.Img variant="top" src={(`./../MusicImages/${d.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                            <Card.Link href="#artist">{d.uid}</Card.Link>
                                            <Card.Text style={{fontSize: 25}}>{d.album_name} - {d.song_name}</Card.Text>
                                            <Card.Text style={{fontSize: 20}}>{d.content}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer style={{fontSize: 15, textAlign: "center"}}>{d.date} - {d.time}</Card.Footer>
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

export default Home;