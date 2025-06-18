import React from "react";
import { useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

import MyNav from "../MyComponents/MyNav";
import MyFooter from "../MyComponents/MyFooter";

function About( {currentUser} ){
    useEffect(() => {
            document.title ="Music Tracker - About"
        }, []);

    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container className="containerCard shadow">
                    <Row>
                        <Card className="mainBody no-border">
                            <Col>
                                <h1 className="title" style={{paddingTop: 12, paddingBottom: 12}}>About <Link to="/">Music Tracker</Link></h1>
                                <Col className="featuresGrid" style={{width: "90%", maxWidth: "70rem", paddingLeft: 40, paddingRight: 40, alignSelf: "center"}}>
                                    <div>
                                        <h1 style={{marginTop: 10}}>General</h1>
                                        <p style={{textIndent: 24, fontSize: 24}}>This is my unnamed senior design project, hence the "Music App" title. It is inspired by <a href="https://letterboxd.com/">Letterboxd</a>, which I have found useful for tracking the movies I want to watch and have already watched, and rating them. In a previous course, a partner and I made a similar, yet very simple, application for video games, so it felt natural for my Senior Design Project to be in the same vein, but expanded upon.</p>
                                        <p style={{textIndent: 24, fontSize: 24}}>The main purpose of this project is to aid in tracking and rating albums you have listened to. However, there are plenty of other functions that naturally coincide with this main objective. For example, creating and signing into accounts, updating info about these accounts, creating lists for each account, adding new albums and artists into the database, and many more functions were needed just for the basic functionality of the project.</p>
                                    </div>

                                    <div>
                                        <h1>Design</h1>
                                        <p style={{textIndent: 24, fontSize: 24}}>This app was designed using React and React Bootstrap, so many of the smaller aesthetic choices, like the rounded corners on buttons, for example, were predetermined by the bootstrap. I wanted the overall look to feel somewhat professional, but not boring, which led me to choose dark blue and light gray as the main colors, with black text and a white background on the main content for readability. In a few places, I left buttons disabled to show that I have plans for further functionality, but I may have run out of time, not quite figured out how to implement the functionality, or felt that it was more important to add functionality elsewhere before coming back to implement this at a later time.</p>
                                    </div>

                                    <div>
                                        <h1>Technical Details</h1>
                                        <p style={{textIndent: 24, fontSize: 24, paddingBottom: 12}}>This project uses <a href="https://react.dev/">React</a> for the Frontend, <a href="https://www.javascript.com/">Javascript</a> for the Backend, and <a href="https://react-bootstrap.netlify.app/">React Bootstrap</a> and CSS for the styling. The SQL database was created using <a href="https://www.mysql.com/">MySQL</a>, and <a href="https://www.apachefriends.org/">XAMPP</a> is used to run a local Apache server and a local MySQL server. To run the local server to view/debug the webpages, <a href="https://www.npmjs.com/">NPM</a> is used.</p>
                                    </div>
                                </Col>
                            </Col>
                        </Card>
                    </Row>
                </Container>
            </header>
            <MyFooter />
        </div>
    )
}

export default About;