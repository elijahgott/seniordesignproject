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
    const sql = "SELECT * FROM userpost";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/users', (req, res)=> { //SELECT DATE_FORMAT(date_joined, '%d/%m/%Y') FROM user -- to get rid of time part
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
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

app.post('/signin', (req, res) => {
    var currentUser = "Anonymous";
    const sql = "select * from user where username = ? and password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0){
            currentUser = req.body.username;
            return res.json("Login Successful for: " + currentUser)
        }
        else{
            return res.json("Login Unsuccessful")
        }
    }) 
})

app.listen(8081, ()=> {
    console.log("Server Running."); 
})

{/*  cd seniordesignproject/Backend -> npm start */}