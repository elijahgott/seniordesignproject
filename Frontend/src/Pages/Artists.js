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

function Artists(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/artists')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav />
            <header className="App-header">
            Artists and stuff. <br></br>
            Planning to display these are cards rather than a table.
            
            <div className="table">
                <Table striped bordered variant="dark">
                <thead>
                    <tr>
                    <th>Artist</th>
                    <th>Bio</th>
                    <th>Photo (just file name right now)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                    <tr key = {i}>
                        <td>{d.name}</td>
                        <td>{d.bio}</td>
                        <td>{d.photo}</td> {/*Format to just display MM/DD/YYYY*/}
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>

            </header>
        
            <div>
        
            </div>
        
            <p>Kinda like a footer if outside of header</p>
        </div>
    )
}

export default Artists;