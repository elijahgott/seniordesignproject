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

app.get('/users', (req, res)=> {
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

app.listen(8081, ()=> {
    console.log("Server Running."); 
})

{/*  cd seniordesignproject/Backend -> npm start */}