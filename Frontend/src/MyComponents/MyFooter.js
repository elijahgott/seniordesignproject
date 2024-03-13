import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';



function MyFooter(){
    return(
        <Navbar expand = "lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Row style={{alignItems: "center", alignContent: "center", color: "lightgray"}}>
                <Col>
                    <h4>List 1</h4>
                </Col>
                <Col>
                    <h4>List 2</h4>
                </Col>
                <Col>
                    <h4>List 3</h4>
                </Col>
            </Row>
          <Outlet />
        </Navbar>
        
    )
}

export default MyFooter;