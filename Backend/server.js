//import {currentUser} from '../Frontend/src/App.js';
//var user = require('../Frontend/src/App.js');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

//need to get currentUser from App.js

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
    const sql = `select * from UserPost where uid IN (select friendID from UserFriend where uid = ?) ORDER BY date DESC;`;
    db.query(sql, 1 ,(err, data) => {
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

app.post('/search', (req, res) => {
    const { search } = req.body;
    const sql = `
      SELECT username as name, bio FROM user WHERE username LIKE '%${search}%'
      UNION
      SELECT name, bio FROM artist WHERE name LIKE '%${search}%'
      UNION
      SELECT name, description as bio FROM album WHERE name LIKE '%${search}%'
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error searching' });
      } else {
        res.status(200).json(results);
        console.log("Successfully Searched Database!");
      }
    });
  });

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM user";
    db.query(sql, 1 , (err, dataUser) => {
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
    const sql = `select * from UserList where uid = ? AND (NOT (name = 'Top 5 Albums' OR name = 'Top 5 Artists'));`; //other lists
    db.query(sql, 2, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlistsong', (req, res)=> {
    const sql = "select * from userlistsong where uid = ?;";
    db.query(sql, 1, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlistartist', (req, res)=> {
    const sql = "select * from userlistartist where uid = ?;"; 
    db.query(sql, 1, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userlistalbum', (req, res)=> {
    const sql = "select * from userlistalbum where uid = ?;"; 
    db.query(sql, 1, (err, dataAlbum) => {
        if(err) return res.json(err);
        return res.json(dataAlbum);
    })
})

app.post('/submitlist', (req, res)=> {
    //get data from forms and add to userposts table
    const { uid, name } = req.body;
    const sql = `insert into UserList (uid, name)
                values (?, ?)`;
    db.query(sql, [uid, name], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted List into Database!");
            res.status(200).send("Data inserted successfully")
        }
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

app.get('/signupuser', (req, res)=> {
    const sql = "select MAX(uid) from User;"; 
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/signup', (req, res)=> {
    //get data from forms and add to userposts table
    const { uid, username, password, dateJoined } = req.body;
    const sql = `insert into User (uid, username, password, date_joined, bio)
                values (?, ?, ?, ?, ?)`;
    db.query(sql, [uid, username, password, dateJoined, null], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Created New User!");
            res.status(200).send("New User Created!") 
        }
    })
})

app.listen(8081, ()=> {
    console.log("Server Running on Port 8081"); 
})

{/*  cd seniordesignproject/Backend -> npm start */}