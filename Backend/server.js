//import {currentUser} from '../Frontend/src/App.js';
//var user = require('../Frontend/src/App.js');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'sdp'
})

app.get('/', (re, res)=> {
    const sql = "select * from UserPost where uid IN (select friendID from UserFriend where uid = 1);";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM user where uid = 1";
    db.query(sql, (err, dataUser) => {
        if(err) return res.json(err);
        return res.json(dataUser);
    })
})

app.get('/albums', (req, res)=> {
    const sql = "SELECT * FROM album";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/artists', (req, res)=> {
    const sql = "SELECT * FROM artist";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/songs', (req, res)=> {
    const sql = "SELECT * FROM song";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/new', (req, res)=> {
    const sql = "select * from album where releaseDate = (select MAX(releaseDate) from album);"; //newest album
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlist', (req, res)=> {
    //const sql = `select * from userlist where uid = ${currentUser.uid};`; 
    const sql = `select * from UserList where uid = 1 AND (NOT (name = 'Top 5 Albums' OR name = 'Top 5 Artists'));`; //only gets uid 1 lists
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlistsong', (req, res)=> {
    const sql = "select * from userlistsong where uid = 1;"; //only gets songs in lists from uid 1 
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlistartist', (req, res)=> {
    const sql = "select * from userlistartist where uid = 1;"; //only gets artists in lists from uid 1 
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlistalbum', (req, res)=> {
    const sql = "select * from userlistalbum where uid = 1;"; //only gets albums in lists from uid 1 
    db.query(sql, (err, dataAlbum) => {
        if(err) return res.json(err);
        return res.json(dataAlbum);
    })
})

app.post('/signin', (req, res) => {
    const sql = "select * from user where username = ? and password = ?";
    var user;
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0){
            user = req.body.username;
            return res.json("Logged in as: " + user)
        }
        else{
            return res.json("Username and password do not match")
        }
    }) 
})

app.listen(8081, ()=> {
    console.log("Server Running."); 
})

{/*  cd seniordesignproject/Backend -> npm start */}