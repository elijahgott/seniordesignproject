const artistsRouter = require('express').Router()
// const User = require('../models/user')
// const Album = require('../models/album')
// const Artist = require('../models/artists')

// gets all artists in database
artistsRouter.get('/', (req, res)=> {
    const sql = "SELECT * FROM artist";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// handles the insertion of a new artist into the database
artistsRouter.post('/', (req, res)=> {
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

module.exports = artistsRouter