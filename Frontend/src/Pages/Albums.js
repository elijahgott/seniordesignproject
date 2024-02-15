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

function Albums(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/albums')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav />
            <header className="App-header">
                Albums<br></br>
                Planning to display these as cards rather than in a table
            
                <div className="table">
                    <Table striped bordered variant="dark">
                    <thead>
                        <tr>
                        <th>Album Name</th>
                        <th>Artist</th>
                        <th>Description</th>
                        <th>Photo (just file name right now)</th>
                        <th>Release Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                        <tr key = {i}>
                            <td>{d.name}</td>
                            <td>{d.artist}</td>
                            <td>{d.description}</td>
                            <td>{d.photo}</td> {/*Format to just display MM/DD/YYYY*/}
                            <td>{d.releaseDate}</td>
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

export default Albums;