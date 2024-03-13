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
import HomeCarousel from "../MyComponents/HomeCarousel";
import MyFooter from "../MyComponents/MyFooter";

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

                <HomeCarousel />

                <p>Lets get a feed here sometime k</p>
                <p>Lets get a feed here sometime k</p>
                <p>Lets get a feed here sometime k</p>
                <p>Lets get a feed here sometime k</p>
                <p>Lets get a feed here sometime k</p>

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
        <MyFooter />
        <p>Kinda like a footer if outside of header</p>
    </div>
    )
}

export default Home;