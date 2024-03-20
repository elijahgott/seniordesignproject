import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import MyNav from "../MyComponents/MyNav";


function Settings(){
    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container>
                    <Row>
                        <Card className="mainBody">
                            <Card.Body>
                                <h1>Account Settings</h1>
                                <Tabs
                                    defaultActiveKey="profile"
                                    id="uncontrolled-tab-example"
                                    className="mb-3" 
                                    justify
                                >
                                    <Tab eventKey="profile" title="Profile" className="settingsTabs">
                                        <p>Username</p>
                                        <p>Name</p>
                                        <p>Bio</p>
                                        <p>Profile Picture</p>
                                    </Tab>  
                                    <Tab eventKey="security" title="Security" className="settingsTabs">
                                        <p>Private Account</p>
                                        <p>Allow Comments From: Friends Only / Anyone</p>

                                    </Tab>  
                                </Tabs>             
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default Settings;