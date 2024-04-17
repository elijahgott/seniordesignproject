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
import Form from 'react-bootstrap/Form';

import MyNav from "../MyComponents/MyNav";


function Settings( {currentUser} ){
    return(
        <div>
            <MyNav currentUser={currentUser}/>
            <header className="App-header">
                <Container style={{marginBottom: 15}}>
                    <Row>
                        <Card className="mainBody shadow">
                            <Card.Body>
                                <h1>Account Settings</h1>
                                <Tabs
                                    defaultActiveKey="profile"
                                    id="uncontrolled-tab-example"
                                    className="mb-3" 
                                    justify
                                >
                                    <Tab eventKey="profile" title="Profile" className="settingsTabs">
                                        <Form>
                                            <Row className="settingsRow">
                                                <h3>Username</h3>
                                                    <Form.Control
                                                        type="username"
                                                        placeholder="Enter New Username"
                                                        className="me-2"
                                                        aria-label="Username"
                                                    />
                                            </Row>
                                            <Row className="settingsRow">
                                                <h3>Bio</h3>
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="Enter New Bio"
                                                        className="me-2"
                                                        rows={4}
                                                    />
                                            </Row>
                                            <Row className="settingsRow">
                                                <h3>Profile Picture</h3>
                                                    <Form.Control
                                                        type="file"
                                                    />
                                            </Row>
                                            <Row className="settingsRow">
                                                <Button>Submit Changes</Button>
                                            </Row>
                                        </Form>
                                    </Tab>  
                                    <Tab eventKey="security" title="Security" className="settingsTabs">
                                        <Form>
                                            <Row>
                                                <h3>Private Account</h3>
                                                <Button>Toggle</Button>
                                            </Row>
                                        </Form>
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