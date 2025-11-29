const artistsRouter = require('express').Router()
const Artist = require('../models/artist')

// gets all artists in database
artistsRouter.get('/', async (req, res)=> {
  const artists = await Artist.find({})

  res.json(artists)
})

// get specific artist by id
artistsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const artist = Artist.findById({ _id: id })
  artist ? 
    res.json(artist) :
    res.status(404).send({ error: `Could not find artist with ID: ${id}.`})
})

// // handles the insertion of a new artist into the database
// artistsRouter.post('/', (req, res)=> {
//     //get data from forms and add to artists table
//     var { name, bio, photo } = req.body;
//     if(!photo){
//         photo = 'default.jpg'
//     }
//     const sql = `insert into Artist (name, bio, photo)
//                 values (?, ?, ?)`;
//     db.query(sql, [name, bio, photo], (err, results)=> {
//         if(err){
//             console.error("Error inserting data: ", err);
//             res.status(500).send("Error inserting data")
//         }
//         else{
//             console.log("Successfully Inserted Artist into Database!");
//             res.status(200).send("Artist inserted successfully")
//         }
//     })
// })

module.exports = artistsRouter