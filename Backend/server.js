//import {currentUser} from '../Frontend/src/App.js';
//var user = require('../Frontend/src/App.js');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();
//app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'sdp'
})

app.get('/home', (re, res)=> {
    const sql = "select * from UserPost where uid IN (select friendID from UserFriend where uid = 1) ORDER BY date DESC;";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.post('/submitpost', (req, res)=> {
    //get data from forms and add to userposts table
    const { uid, content, photo, song_name, album_name, date, time } = req.body;
    const sql = `insert into UserPost (uid, content, photo, song_name, album_name, date, time)
                values (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [uid, content, photo, song_name, album_name, date, time], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Post into Database!");
            res.status(200).send("Data inserted successfully")
        }
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

app.post('/submitalbum', (req, res)=> {
    //get data from forms and add to artists table
    var { name, artist, description, photo, releaseDate } = req.body;
    if(!photo){
        photo = 'default.jpg'
    }
    const sql = `insert into Album (name, artist, description, photo, releaseDate)
                values (?, ?, ?, ?, ?)`;
    db.query(sql, [name, artist, description, photo, releaseDate], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Album into Database!");
            res.status(200).send("Album inserted successfully")
        }
    })
})

app.get('/artists', (req, res)=> {
    const sql = "SELECT * FROM artist";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/submitartist', (req, res)=> {
    //get data from forms and add to artists table
    var { name, bio, photo } = req.body;
    if(!photo){
        photo = 'default.jpg'
    }
    const sql = `insert into Artist (name, bio, photo)
                values (?, ?, ?)`;
    db.query(sql, [name, bio, photo], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Artist into Database!");
            res.status(200).send("Artist inserted successfully")
        }
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
    const {username, password} = req.body;
    const sql = "select * from user where username = ? and password = ?";

    db.query(sql, [username, password], (err, results) => {
        if(err){
            console.error('Error executing query: ', err);
            res.status(500).json({message: 'Error signing in'});
        }
        else {
            if(results.length > 0){
                const token = jwt.sign({ username }, 'testing_key', { expiresIn: '1h' });
                res.status(200).json({message: 'Sign in successful', token, user: results[0]});
            }
            else {
                res.status(401).json({message: 'Invalid username or password'})
            }
        }
    }); 
});


app.listen(8081, ()=> {
    console.log("Server Running on port 8081."); 
})

{/*  cd seniordesignproject/Backend -> npm start */}