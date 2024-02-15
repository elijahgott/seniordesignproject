const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'sdp'
})

app.get('/', (re, res)=> {
    return res.json("Backend");
})

app.get('/user', (req, res)=> {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/album', (req, res)=> {
    const sql = "SELECT * FROM album";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/artist', (req, res)=> {
    const sql = "SELECT * FROM artist";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/song', (req, res)=> {
    const sql = "SELECT * FROM song";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=> {
    console.log("Server Started."); 
})

{/*  cd seniordesignproject/Backend -> npm start */}