import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import MyNav from '../MyComponents/MyNav.js';

import {currentUser} from '../App.js';
import axios from "axios";

function CreatePost(){
    const date = new Date();
    //console.log(date.getFullYear() + "---" + (date.getMonth()+1) + "---" + date.getDate())

    //const [inputErrorList, setInputErrorList] = useState({}) // used to show errors with input

    const[post, setPost] = useState({
        uid: 1,
        content: '',
        photo: '',
        song_name: '',
        album_name: '',
        date: '',
        time: ''
    })

    const handleInput = (e) => {
        e.persist();
        setPost({...post, [e.target.name]: e.target.value})
    }

    const savePost = (e) => {
        e.preventDefault();
        const data = {
            uid: post.uid,
            content: post.content,
            photo: post.photo,
            song_name: post.song_name,
            album_name: post.album_name,
            date: post.date,
            time: post.time
        }

        axios.post(`http://localhost:8081/home`, data)
        .then(res => {
            alert(res.data.message);
        })
        .catch(function (error) { //used to show errors with input
            console.log(error.response.data)
        });
    }

    return(
        <div>
            <MyNav />
            <header className="App-header">
                <Container style={{height: "100vh", marginTop: 15}}>
                    <Card >
                            <Form onSubmit={savePost}>
                                <h1 style={{textAlign: "center", marginTop: 10, marginLeft: 15}}>New Post</h1>
                                <Container style={{marginLeft: 15, marginRight: 15}}>
                                <Form.Group>
                                    <Form.Label className="text-bold">Post Text</Form.Label>
                                    <Form.Control type="textarea" name="content" value={post.content} onChange={handleInput}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Album Name (Optional)</Form.Label>
                                    <Form.Control type="textarea" name="album_name" value={post.album_name} onChange={handleInput}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Song Name (Optional)</Form.Label>
                                    <Form.Control type="textarea" name="song_name" value={post.song_name} onChange={handleInput}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Attach Photo (Optional)</Form.Label>
                                    <Form.Control type="file" name="photo" value={post.photo} onChange={handleInput}></Form.Control>
                                </Form.Group>
                                    <Link to="/"><Button variant="secondary">Cancel</Button></Link>
                                    <Button variant="primary" type="submit" style={{marginLeft: 5}}>Submit</Button>
                                    <div style={{marginBottom: 5}} />
                                </Container>
                            </Form>
                    </Card>
                </Container>
            </header>
        </div>
    )
}

export default CreatePost;