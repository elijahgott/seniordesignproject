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
import MyNav from "../MyComponents/MyNav";

function Home(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8081/user')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  }, [])
    return(
        <div>
            <MyNav />
            <header className="App-header">
            <Card style={{ width: '25rem'}}>
            <Card.Body>
                <Card.Img style={{ height: 200 }}variant="top" src="https://i.redd.it/pve0tjjdhvu61.jpg"></Card.Img>
                <Card.Title>Bing Chilling</Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Text>Zǎo shang hǎo zhōng guó!</Card.Text>
                <Card.Link href="#cardlink">CCP Website</Card.Link>
            </Card.Body>
            </Card>
            <br></br>
            <Image src="https://www.fanduel.com/fantasy/_next/image?url=https%3A%2F%2Fd17odppiik753x.cloudfront.net%2Fplayerimages%2Fnba%2F9488.png&w=256&q=75" roundedCircle />
            <br></br>
            <p>LeBum James</p>
            <p>May Allah have mercy upon his soul.</p>
            <Button variant="danger">Kill Him</Button>
            <br></br>
        </header>
        <div>
            <Table striped bordered variant="dark">
            <thead>
                <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Date Joined</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                <tr key = {i}>
                    <td>{d.uid}</td>
                    <td>{d.username}</td>
                    <td>{d.date_joined}</td> {/*Format to just display MM/DD/YYYY*/}
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