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
    useEffect(() => {
            document.title ="Music Tracker - Artists"
        }, []);

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/artists')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])

    const [topThreeArtists, setTopThreeArtists] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/topthreeartists')
        .then(res => res.json())
        .then(topThreeArtists => setTopThreeArtists(topThreeArtists))
        .catch(err => console.log(err));
    }, [])

    let hasFetched = false;
    if(topThreeArtists.length > 0){
        hasFetched = true;
    }

    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
            <Container style={{marginTop: 10, minHeight: '100dvh'}}>
                    <Row>
                        <Col>
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginTop: 15, marginBottom: 15}}>Top Artists</h1>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem"}}>
                        {hasFetched ?
                        topThreeArtists.map((artists, i) => (    
                                        <Card className="shadow" style={{maxWidth:"26rem"}}>
                                            <Card.Body>
                                                <Card.Img variant="top" src={require(`./../MusicImages/${artists.photo}`)} style={{maxWidth: 500}}></Card.Img>
                                                <Card.Link>{artists.name}</Card.Link>
                                                <Card.Subtitle>#{i+1} Artist</Card.Subtitle>
                                                <Card.Subtitle style={{marginTop: 3}}>Average Rating: {artists.average_rating}</Card.Subtitle>
                                                <Card.Text style={{fontSize: 20}}>{artists.bio}</Card.Text>
                                            </Card.Body>
                                        </Card>
                        )):
                        <>
                            <Card className="shadow" style={{maxWidth:"26rem"}}>
                                <Card.Body>
                                    <Card.Img variant="top" src={require(`./../MusicImages/aliceinchains.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                    <Card.Link>Alice in Chains</Card.Link>
                                    <Card.Subtitle>#1 Artist</Card.Subtitle>
                                    <Card.Subtitle style={{marginTop: 3}}>Average Rating: 100</Card.Subtitle>
                                    <Card.Text style={{fontSize: 20}}>Alice in Chains is an American rock band formed in Seattle in 1987.</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="shadow" style={{maxWidth:"26rem"}}>
                                <Card.Body>
                                    <Card.Img variant="top" src={require(`./../MusicImages/nirvana.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                    <Card.Link>Nirvana</Card.Link>
                                    <Card.Subtitle>#2 Artist</Card.Subtitle>
                                    <Card.Subtitle style={{marginTop: 3}}>Average Rating: 95</Card.Subtitle>
                                    <Card.Text style={{fontSize: 20}}>Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer and guitarist Kurt Cobain and bassist Krist Novoselic.</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="shadow" style={{maxWidth:"26rem"}}>
                                <Card.Body>
                                    <Card.Img variant="top" src={require(`./../MusicImages/dannybrown.jpg`)} style={{maxWidth: 500}}></Card.Img>
                                    <Card.Link>Danny Brown</Card.Link>
                                    <Card.Subtitle>#3 Artist</Card.Subtitle>
                                    <Card.Subtitle style={{marginTop: 3}}>Average Rating: 90</Card.Subtitle>
                                    <Card.Text style={{fontSize: 20}}>Daniel Dewan Sewell, better known as Danny Brown, is an American rapper, singer and songwriter from Detroit, Michigan.</Card.Text>
                                </Card.Body>
                            </Card>
                        </>
                    }
                    </Row>
                    <Row style={{marginTop: 30}}>
                        <Col>
                        {currentUser ? (
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>All Artists <Link to="/AddArtist"><Button style={{marginBottom: 7}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></Link></h1>
                            </Card>
                        ) : 
                            <Card className="headerCard shadow" style={{maxWidth:"81rem"}}>
                                <h1 style={{textAlign: "center", marginBottom:"15px", marginTop:"15px"}}>All Artists <Button disabled style={{marginBottom: 7}}><Image src={require('./../MiscImages/plus-icon-sm.png')}/></Button></h1>
                            </Card>
                        }
                            
                        </Col>
                    </Row>
                    <Row style={{display: "flex", gap: 24, marginLeft: 0, marginTop: 10, maxWidth:"81rem"}}>
                        {data.map((d, i) => (    
                                        <Card className="shadow" style={{maxWidth:"26rem"}} border="none">
                                            <Card.Body>
                                                <Card.Img variant="top" src={require(`./../MusicImages/${d.photo}`)} style={{width: 358, height: 358}}></Card.Img>
                                                <Card.Link>{d.name}</Card.Link>
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